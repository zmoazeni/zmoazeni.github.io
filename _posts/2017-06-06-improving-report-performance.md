---
layout: post
title: "Improving Report Performance"
date: 2017-06-06T14:00:00+00:00
author: zach@getharvest.com
---

_Originally posted to [http://techtime.getharvest.com/blog/improving-report-performance](http://techtime.getharvest.com/blog/improving-report-performance)._

Last year, I [made a promise](https://www.getharvest.com/blog/2016/12/a-gift-of-time/) to share the gritty details of how we improved our reporting performance dramatically, anywhere from a factor of 4x to 10x. I spent over a year on this project and I am very pleased with the results. I want to share some of our wins with you all in case they help anyone else.

First, you have to know a little about our data model for these gains to make sense. Our customers have users in their account track time for tasks on projects they're assigned to.

{% include svg/improving-report-performance1.svg %}

We use Percona MySQL in production. We have verified that all of our indexes are appropriate, and our queries are using the right indexes. So we knew that in order to get better performance out of these queries we needed to make some architectural changes. I spent around a month experimenting with a few different approaches on hardware similar to production using the production dataset. After trial and error, and looking at the resulting numbers, I finally had a plan.

## Improvement 1: Organize time entries table by project

My first change may sound strange to Rails developers, but made a lot of sense at the MySQL layer. I reorganized the data on disk by changing the primary key of our time entries table. A table that holds over 500 million rows. This is not a MySQL-specific concept. If you're interested you can also search for "clustered index", but for MySQL the primary key is the clustered index.

[MySQL's docs](https://dev.mysql.com/doc/refman/5.7/en/innodb-index-types.html) explain it better than I can:

> Accessing a row through the clustered index is fast because the index search leads directly to the page with all the row data. If a table is large, the clustered index architecture often saves a disk I/O operation when compared to storage organizations that store row data using a different page from the index record.

**Making this change sped up our report queries instantly by about 50% across the board (queries that took 12 seconds now took around 6 seconds).**

MySQL stores data in pages, or clumps of rows/records. By default, for typical tables with an auto-incremented id, that means related rows are scattered around the disk based on the order they were inserted. Most of our queries retrieve and report on all time entries for a given project, so when I changed the primary key from `(id)` to an existing index which is `(project_id, spent_at, id)`, it meant that on disk all time entries for a given project were sitting next to each other. Reducing a lot of random access.

To help illustrate the point. Let's assume I have a page of rows organized by the `id` column. It might look something like this.

<table>
  <colgroup>
    <col width="25%" />
    <col width="25%" />
    <col width="50%" />
  </colgroup>
  <thead>
    <tr class="header">
      <th>id</th>
      <th>project_id</th>
      <th>notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1000</td>
      <td>50</td>
      <td>Reviewed Web Design</td>
    </tr>
    <tr>
      <td>1001</td>
      <td>203</td>
      <td>Spoke with client</td>
    </tr>
    <tr>
      <td>1002</td>
      <td>50</td>
      <td>Worked on new logo</td>
    </tr>
    <tr>
      <td>1003</td>
      <td>203</td>
      <td>Wrote down meeting notes</td>
    </tr>
  </tbody>
</table>

As you can see, two entirely separate projects are intertwined together based on the id order. However once I change the primary key to be based on the project id, we get something like this:


<table>
  <colgroup>
    <col width="25%" />
    <col width="25%" />
    <col width="50%" />
  </colgroup>
  <thead>
    <tr class="header">
      <th>id</th>
      <th>project_id</th>
      <th>notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1000</td>
      <td>50</td>
      <td>Reviewed Web Design</td>
    </tr>
    <tr>
      <td>1002</td>
      <td>50</td>
      <td>Worked on new logo</td>
    </tr>
    <tr>
      <td>2000</td>
      <td>50</td>
      <td>Helped web designer with CSS</td>
    </tr>
    <tr>
      <td>5000</td>
      <td>50</td>
      <td>Final call with client</td>
    </tr>
  </tbody>
</table>

All time entries for that project are now grouped together within the pages on disk.

Now I was really skeptical that this would have any performance boost because our monster database servers are using high performance enterprise SSDs in a RAID 10. On top of that, we have an extremely large InnoDB Buffer Pool with a hit rate of around 99%. So most data is served from memory, and even if it does have to hit the disk, it's still much faster than than a traditional spinning platter. But our metrics proved me wrong and we were able to take an easy win right away.

To keep Rails happy, we still have the auto-incremented id, but I added a manual unique index on it and I added `self.primary_key = :id` to the top of our time entry model. But for all intents and purposes this change is transparent to Rails and the rest of our code.

This technique is not a free lunch. This will create more data pages overall for the table because MySQL will want to keep a portion of the page empty as defined by the [`MERGE_THRESHOLD`](https://dev.mysql.com/doc/refman/5.7/en/index-page-merge-threshold.html). We are effectively trading disk space for much better read performance, and in our scenario that was perfectly acceptable. The disk space required for the time entries table ballooned after this change (and the next one I'll talk about). If you are interested in more information about MySQL's page mechanics, take a look at [this great post on Percona's blog](https://www.percona.com/blog/2017/04/10/innodb-page-merging-and-page-splitting/).

## Improvement 2: Denormalize important reporting data into time entries

The next step to increasing performance was to denormalize the important reporting data into the time entries table. This is not a new practice at all, but it did have some shocking results for our data set.

One thing to know is that Harvest also allows a lot of flexibility in the way a project can be configured. Those settings will determine what time is billable and by how much. Meaning that some combinations of project settings store important report information in the join tables. For example, a project may bill by a person's hourly rate. So for our report queries we also have to join those tables in order to have all the key pieces of information available. As you can imagine our reporting queries end up requiring a lot of boilerplate for our joins.

{% include svg/improving-report-performance2.svg %}

If you have used our public API, these concepts will be rather straight forward.

If you look back at that graph, you can imagine how our queries reporting on time entries would have to continue to join both the user and task assignments tables. Just looking at "what is the billable rate for this time entry" could end up looking at either the project, user assignment, or task assignment based on how the project is setup to be billed (billed by project, user, or task). Even asking "is this time entry billable?" will always consult the task assignments table (a task is marked billable or non-billable for a given project).

That means in order to show anything meaningful for our customers, we have to join these tables all the time. The nice thing about that design is that if a value changes in one place, all reports are instantly updated.

However, what I didn't realize was the cost involved in joining those tables. As I said previously, our indexes are set up just fine. However even with great indexes, when you take millions of time entry rows and join them to hundreds of related task assignment rows, there is still lots of work for MySQL to process. All things considered, it is rather impressive how quickly it can process that much work. But even after I reorganized the time entries table, I wanted better performance than our 6 second worst case query.

So in addition to changing the primary key, I also added a few more columns on the time entries table, like `billable` and `billable_rate`. I also updated our Rails code to populate those fields when a time entry was created or updated, and **also** when a project's settings changed dramatically.

This section of denormalization code is complex. However, the upshot is that now all of our reporting queries have immediate access to the necessary data at the time entries level. We no longer need to join any other tables in order to calculate reporting data, meaning our reporting queries become easier to understand and maintain and less error prone. It also means that the bulk of the complexity is isolated to one section that the rest of the application depends on.

**Shockingly, that took our worst case 6 second query down to around 1.5 seconds by just eliminating those joins.**

To step back, with these two changes, our worst case 12 second query was now around 1.5 seconds. Decent sized projects that originally took around 2 seconds now ran in 0.25 seconds. Both of these changes contributed to this massive performance boost.

Just like changing the primary key, this strategy isn't a free lunch either. Now that the reporting data is denormalized, there's always a possibility for it to fall out of sync with the original data stored in separate tables. Scenarios like programmer errors, customer support changes, or even freakish once-in-a-blue-moon events all have the potential of messing with that balance.

To mitigate those problems, as part of the Rails changes, we're testing our denormalization code very heavily. We are also running a consistency check once a day to make sure all of those denormalized fields stored have correct data. These two strategies have worked remarkably well for finding problems when they occur.

This also worked out wonderfully as we transparently rolled out these changes to our customers. Even before we started using the new data in the report queries, we could store and verify the contents, allowing me to hunt down any holes in our logic and ensure the data can be trusted. These steps have also helped us with current development as we [explore new project settings](https://www.getharvest.com/blog/2017/05/introducing-fixed-fee-projects/).

Aside from the logical errors that could happen, we also take another disk space penalty as we widen our large table. With the new primary key and the new columns, our time entries table ballooned by about 25%. But for our data set, this trade off was an easy decision.

## Parting thoughts ##

I am extremely happy with these results and I hope that this information can help other teams as they examine their own application's query performance. I believe we made these changes at the right time and I would not have started out our application with either of these techniques. Going forward we'll have to see whether these approaches still apply or if there are smarter choices we can make, but for now, we can celebrate.
