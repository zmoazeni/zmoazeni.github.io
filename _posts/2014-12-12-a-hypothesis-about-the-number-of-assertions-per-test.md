---
title: A hypothesis about the number of assertions in a test
excerpt: We have been discussing testing styles at work. My team's preference is split on one-assertion-per-test. This describes a hypothesis I have about developers in both camps.
---

Lately at work we have been discussing a testing style that has been named [one assertion per test](http://blog.jayfields.com/2007/06/testing-one-assertion-per-test.html). Here is [another blog post](http://maxheapsize.com/2011/06/14/one-assert-per-test-really/) describing this style.

In essence for one-assertion-per-test the goal is to keep all tests focused on one part of the behavior. A couple benefits of this style:

* You don't have to re-run a test multiple times in order to make it pass. If it fails, you can red-green it without another assertion in the same test failing.
* You can give more descriptive names to the tests.

I strongly dislike the one-assertion-per-test heuristic, but I do like my tests having a single focus. I've even called it "one focus per test" when discussing this with collegues.

What is interesting about this discussion is not that one style is clearly right and one is clearly wrong (who am I kidding? "one focus per test" all the way baby!). It is that a lot of the discussion keeps circling back to _"It's easier for me to follow ..."_ or _"It's easier for me to grok..."_ or _"I can immediately understand a test when ..."_

After thinking about it, I have a hypothesis. I think people in the different camps focus on different pieces of code in order to understand something at a glance. Imagine someone showing you a picture of a person for 5 seconds and then taking it away.

<a href="https://www.flickr.com/photos/time-to-look/15064231818" title="2014 - Vancouver - News in Chinatown by Ted McGrath, on Flickr"><img src="https://farm4.staticflickr.com/3924/15064231818_6d291253e8_c.jpg" width="800" height="347" alt="2014 - Vancouver - News in Chinatown"></a>

_([picture by Ted McGrath](https://www.flickr.com/photos/time-to-look/15064231818) under [creative commons license](https://creativecommons.org/licenses/by-nc-sa/2.0/))_

Some observers might gravitate towards their physical appearance "what colors are they wearing", "what does their hair look like?". Others might focus on their face "what mood are they in?" "is their facial expression telling me anything?". Other observers might even focus on thing behind the person "where are they at?"



Bringing this back to tests, I put together two versions of a fancy complicated example service called [NumberwangService](https://github.com/zmoazeni/numberwang.rb/blob/master/numberwang_service_spec.rb). It's too easy to get sucked into trivial examples or overcomplicate the context for a specific example so my code uses the business rules to the gameshow [Numberwang](https://www.youtube.com/watch?v=qjOZtWZ56lc). _(To be fair, most internal business rules feels like Numberwang to outsiders)_

My hypothesis is that one-assertion-per-test developers tend to focus first on the **test descriptions**:
<img src='/uploads/single-assertion-numberwang.png' width='800'>

and multi-assertions-per-test developers tend to focus first on the **test code**:
<img src='/uploads/multi-assertion-numberwang.png' width='800'>

I'm not saying that one-assertion developers don't care about the test body, and multi-assertion developers don't care about the test description. But I have a hunch that developer eyes gravitate towards points like this when trying to take in and understand multiple tests at once depending on their preferences.

I know that my habit is to focus on the test code itself and that's why I take time to make tests readable and understandable. Like cohesive paragraphs on a page.


