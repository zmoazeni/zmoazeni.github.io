---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Ascribe - A Case Study on View Specs
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 118
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0xMTg=
date: 2008-02-16 18:00:40.000000000 -05:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
### Background

When we started development on [Ascribe](http://www.ascribehq.com/) about 3 months ago, I had a hankering to try out RSpec. We used a lot of similar concept on a test/unit side such as small readable tests and mock testing, but we hadn't given view specs a try. To be fair, I had been pretty critical of view specs prior to the project; not really seeing the benefits. This is a write up on our experiences. There will be a lot of verbiage like "felt", "thought" and not a lot hard numbers.

### Expectations

As I said, I had been pretty critical about using view specs. I had seen them used together in functional tests, and I strongly disliked the "cluttered" look of controller assertions intermixed with the view assertions. My main concerns using them were:

* A significant amount of time to initially create the spec
* The additional rigidity of changing views
* Brittleness in comparison to other tests we value (unit, controller, and integration)
* The added technical hurdle for allowing designers or html developers to contribute

### In practice

#### "A significant amount of time to write the specs"

We were actually quite surprised to find that writing the view specs were the easiest among all of our tests. Essentially, all that is asserted is the presence of text. When in comparison to testing object interaction, or algorithms, this felt brain-dead simple. Further reinforcement is that there shouldn't be a lot of code in the views. If you noticed your view or spec getting complicated, it generally helped to pull out code (helpers, additional model behaviors). Of course we found testing pitfalls, and became more judicious in what we would assert.

Examples of what we would test:
* Presence of html controls like text fields, text areas, select, etc.
* Presence of labels
* Important attributes for html controls (names, ids, and sometimes classes<sup>[1](#fn1)</sup>)
* Form actions, and alternate http methods (delete, put)
* Partial renders
* Custom helper calls
* Iterators and If/Else controls
* Anchors

Examples of what we would not test:
* HTML Containment. We would only assert this if it was required for RJS
* Exact text. More often than not, we wold assert a portion of the text with case insensitive regular expressions
* Common helpers like `h()`
* HTML classes not used for client javascript or rjs. We found this hindered css from an html developers point of view, and did not provide a lot of value.

#### "Additional rigidity for changing views"

To discuss this, it may help to lend insight to our team. There was [Janson](http://whycurious.tumblr.com/) and me, both developers who wrote and maintained ruby, all specs, and html / css. We also had [Aaron](http://theparagon.org/) who is not a developer, but is really knowledgeable about html / css. One of our concerns was every time Aaron would want to make a change to the design, either we would have to be there with him, or we would have to teach him how to run, fix, and create view specs. 

We ended up opting for a completely different approach. We told him to ignore the specs in all regards save one. If he was going to add rhtml calls (typically anything with `<%= %>`) we asked if he would open up the spec for the view and create a pending statement. 

    it "should have a link to the dashboard"

That way we would be able to return later and flesh out the stubbed specs. Although this isn't exactly promoting TDD, it allowed him to keep running, as well as placing a bookmark in the code for us. We never felt as if we were getting bombarded with pending statements, and quickly writing them and moving on didn't feel time consuming.

#### "Brittleness in comparison to other tests we value (unit, controller, and integration)"

With Aaron working on the html, we were even more concerned with the brittleness of our tests than if the entire team were ruby developers. At Elevator Up it is very common that we have non-developers contributing to the html / css, so obviously I was apprehensive of being overwhelmed by constantly breaking specs. No developer likes to consistently fix other developers broken tests. And it wasn't exactly like we could yell at Aaron for not doing his job. This is one expectation that played out in the course of development, but in a different light.

When Aaron would make a commit it was pretty common for him to break tests. In fact I believe his record was 38, and without any numbers, my guess was he averaged around 5 - 10 breaks per commit. What we didn't anticipate was that fixing 30+ tests took no more than 15 minutes. That was a huge shocker to me. A non-developer would rip out the code we were asserting, make additional calls that weren't stubbed, and it only took us 15 minutes to fix them all.

We found that the biggest breakages were due to calling mocked helpers in a valid, but unexpected manner. Since all other spec relied on a valid render, they would break as well. In some cases, fixing one line, would fix 10-20 assertions. There were also a few instances where the specs actually broke for the right reasons. For example, a `link_to` was modified and the href wasn't pointing to the right location.

#### "The added technical hurdle for allowing designers or html developers to contribute"

With only having Aaron add pending statements on code additions, he didn't feel uncomfortable, or feel like he had to learn how to program just to make visual changes. This felt like a huge win for us. While it would be nice to have all html / css developers understand and maintain ruby, this isn't realistic at Elevator Up.

### Other Surprises

Up to now I've only talked how our expectations matched up to our experiences, however I haven't mentioned any benefits of view testing. Talking about the benefits of testing views is just as difficult as talking about the benefits of unit testing, or using mocks. You can't convince another developer with anecdotes alone. Using them in practice normally speaks volumes in a much more articulate way.

That being said, as we worked on Ascribe, I kept a list of successes that I felt the view specs were the prime contributer to<sup>[2](#fn2)</sup>.

* Checking label "for" mispellings
* Ensuring all input fields are present
* Asserting non "sunny day" code paths (if/then)
* Using fields that could potentially be nil
* Ensuring links are pointing to the correct places
* Ensuring forms are posting to the right places
* Ensuring forms are posting with the right method
* Incorrect usage of named routes
* Renaming / Refactoring Routes
* Ensuring render partials have correct locals
* Better confidence in refactoring views into partials / or helpers	
* Ensuring correct usage of helpers `link_to`, `link_to_remote`, `form_for`
* Better testing-as-documentation for RJS
* Using pending tasks as view centric TODOs 

### Summary

A realization that sparked while we were at the end of the project, was that compared to unit, controller, and integration tests, view tests are cheap. Their creation and maintenance are very low, and for their small amount of effort, noticeable benefits arise. It feels comparable to investing pennies and earning $200. We were very pleased we went out on a limb and gave them a shot. Elevator Up has made it a point to add view specs to our development routine.


<div id="fn1">
  We found this useful since we use dashed ids instead of underscored. Also we found on more than one occasion, we were using rails tags incorrectly. One of the biggest culprits was setting ids and classes on select tags.
</div>

<div id="fn1">
  I'm not saying that these are unique to view specs, and can't be achieved with other testing techniques.
</div>
