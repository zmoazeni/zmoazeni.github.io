---
layout: post
title: Testing and Tautologies
date: 2007-12-04 00:47:16.000000000 -05:00
---
A question that I'm asked frequently, especially in regards to mock testing is: "I know it seems worth it to test, but isn't it just a tautology? I mean when your code changes you have to change your tests."

I have a couple responses to this. It is true that there are times when the code changes, that I have to update the tests too, however that's not always true, even with mock testing. I've found the more I use mocks, the more I end up refactoring and decomposing code into simpler bits. Tests can be one of the loudest critics of your code, if you know how to listen.

Tautologies is an interesting topic. At the last [XP West Michigan](http://xpwestmichigan.org/pages/November2007) Scott Miller mentioned that a fellow coworker of his Bill Bereza brought up the idea of [double entry bookkeeping](http://en.wikipedia.org/wiki/Double_entry_bookkeeping) in accounting. And that when it applied to software development, he really didn't have a problem with it. I never thought about testing in that light. Whenever I would try to answer the question before, though I would fail to find an adequate reason why testing was not just like double entry bookkeeping. But in reality I've just never encountered a problem with it.

To put it simply, even if it's considered double entry coding, I don't notice a productivity loss, and in fact I've noticed gains. Though I know that can be unsatisfying for people who want more than just one developer's opinion on his personal experiences.

Regardless of the existence of tautologies, tests allow you to mark off small chunks of executable code. One of my biggest irritations is to constantly open up the browser and click around to ensure what I just wrote works during development. In the end, I will go through the manual steps to wrap something up, however problem solving quickly loses its luster when it requires 5-10 steps every change. It gets exciting when you implement a chunk of functionality only to look over and realize that your mongrel server was down.

Similarly, when implementing a piece of code that depends upon another. It is such a breath of fresh air to finish the former, without even worrying about the existence of the latter. I would hate the rabbit holes I would travel in order to finish my original thought.

So from the outside, some of the tests may appear to be duplicates of their implementation, though I would contend that it is merely a different perspective of correctness. But weighing the good with the bad, tests take me much further faster than I would otherwise go.
