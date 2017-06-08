---
layout: post
title: "Code Reviews at Harvest"
date: 2014-10-02T15:29:02+00:00
author: zach.moazeni@gmail.com
---

_Originally posted to [http://techtime.getharvest.com/blog/code-reviews-at-harvest](http://techtime.getharvest.com/blog/code-reviews-at-harvest)._

Let’s face it — code reviews can be tough. Even if your team fully adheres to a certain [style guide](https://github.com/bbatsov/ruby-style-guide), programming is so subjective that smart people can argue great points on conflicting approaches.

We use [GitHub Pull Requests](https://help.github.com/articles/using-pull-requests) heavily at Harvest and we require code reviews for everything meaningful that goes into production. Here’re a few guidelines that we’ve developed for reviewing each other’s changes so we can stay productive and focused on what’s important — launching code.

## Our current process ##

Every company has a different deployment process, but here at Harvest it looks a little something like this:

1. We discuss what needs to be built, changed, or fixed.
2. A developer/designer creates a branch off of master.
3. They work on their branch. When it’s complete they push it up to GitHub and create a Pull Request tagging an appropriate person or team to review it.
4. One or more tagged people from that team will review the code and give a +1 when they feel it’s ready to be deployed.
5. The original submitter will then merge it into master and deploy it.

Multiple posts could be written about each of these steps. However I’m only going to talk about #3 and #4.

We use code reviews at Harvest to help communicate with the team what’s going into production, to help each other learn new tricks and techniques as things evolve, and to point out specific areas to investigate that we may unintentionally break.

## If it fixes a serious bug, just let it go ##

We might disagree on approach, but if there’s a serious issue in Harvest that’s affecting a customer, and someone on the team has a [fix for it](/blog/find-bugs-once-and-the-joy-of-bug-fixing), we will always let it ship. We can always circle back and fix it better or more thoroughly later.

## Know what’s blocking your code ##

Code reviews can feel unproductive because they don’t have a clear goal. We’ve put together a survey we call [FIAS (the Filler Impact Assessment Survey)](http://harvesthq.github.io/fias/?v1=1&v2=1&v3=1), a tongue-in-cheek acronym named after [Patrick Filler](https://www.getharvest.com/about/meet-the-team#patrick-filler), the Harvester who proposed the idea.

The idea is simple: take an educated guess at ranking three questions on a scale of one to ten:

* How much of the app is affected?
* How much of this change is mysterious to you?
* How easy is it for you to imagine this performs in an unexpected way after deployment?

Then add up the scores for each question.

* If the score is less than fifteen, you only need one person to give you a +1.
* If the score is fifteen to twenty, you need two people to give you a +1.
* If the score is over twenty, you need two people and full QA.

_QA is different for each team. Harvest has staging environments that mirror production and we have scripts for each section that we manually test._

This isn’t perfect and the results may not make sense for other teams. For example, another team may want three people to +1 or always QA above ten points. However, the point is that, when a Pull Request begins review, we have a clear idea what it will take to launch it to production.

We also don’t always follow the FIAS. For example, even if we only need one +1, the submitter may still override the FIAS and ask for two to three +1s because they know their changes involve a particularly tough part of the codebase.

Now that we have a set goal, we can work backwards. If some of the changes makes a reviewer uncomfortable, can that part be segmented out and the rest launched instead? Can this branch be merged even if there’s a heated discussion over using the [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle) vs a single clear object?

With a simple process, we’ve removed the ambiguity that most code reviews start with.

## Communicate clearly to reviewers what’s going on ##

FIAS is a great tool to get a general sense of how large (and risky) a change is to you — but it isn’t always the best tool for communicating to your reviewers what the change actually entails. Sometimes, [GIFs](http://www.schneems.com/post/41104255619/use-gifs-in-your-pull-request-for-good-not-evil/) or annotated before and after images (made with tools like [Monosnap](http://monosnap.com/welcome)) can be more effective. Pre-commenting certain areas in your own Pull Request is also helpful: “I know this line seems unrelated, but it is because…”

Clearly communicating the change starts the code review on the right foot. The submitter may have invested days working on a change, but the people reviewing it have not.

## Clarify blocking comments ##

Not every comment or question has to be resolved. Text doesn’t always convey emotion, and it’s easy to misread someone’s intent. It’s perfectly fine to ask a reviewer, “Is this a blocking issue?” Often it isn’t, or it can be handled separately.

Pull Requests can also end up being a lightning rod for debate. Discussions among the team can continue on a Pull Request, but they can also be moved elsewhere — to a separate issue, internal tool, or even a meeting.

Our reviewers will normally prefix comments with “[NB]” for non-blocking comments: “[NB] This works, but here’s a quick snippet that’s a little more clear”. A simple prefix like that can help speed along code reviews.

## Face-to-face meetings ##

We often raise a white flag and ask for an impromptu face-to-face meeting or a quick chat, usually by spinning up a [Google Hangout](https://www.google.com/+/learnmore/hangouts/) or conversation in [HipChat](https://www.hipchat.com/). This seems like an obvious tip. However recognizing the need for these meetings can be tricky. If two people have posted back and forth at least once on the same topic, it will likely be easier to just hash it out face-to-face. If you find yourself writing two paragraphs, some of your concerns will likely get lost. You may be able to convey your thoughts better over audio.

It’s nice to see a comment history of how decisions were made. However, you can still accomplish this by posting a quick recap of what was decided in the meeting.

## Don’t limit the number of reviewers ##

Everyone on the team pitches in with code reviews and we don’t have official reviewers here at Harvest. We may purposefully ping someone who we know has had a lot of experience in a particular area, but we never wait on one person to go through all the reviews.

This becomes a bigger deal as the team grows. With an application as large as Harvest, it’s extremely difficult to keep everything in your head. And even if you do feel good about a certain area, it will likely change over time as other people help out with maintenance.

We also notify people to give them a heads-up without expecting them to review the pull request. We do this by prefixing “/cc” before their name  “/cc @zmoazeni this might affect your work on reports”.

## Not a perfect process ##

We don’t have any delusions  that our process is perfect. However all of these points help speed along our code reviews. Taking some of these tips and morphing it to fit your organization may help out your team too — or, if you think your process could help out our team, write up your process and [send us a link](mailto:zach@getharvest.com)! We’re always looking to improve.
