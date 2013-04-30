---
title: Why csscss doesn't remove duplication for you
layout: post
excerpt: Reasons behind csscss's design.
tags: [highlighted]
---

After I released [csscss](http://zmoazeni.github.io/csscss/), I've been asked numerous times:

> Why doesn't csscss remove duplication for me?

That is a fair question. It is easy to look at csscss and ask why it
isn't more like a
[minifier](http://en.wikipedia.org/wiki/Minification_(programming\))
that a developer can just run before deploying updates. In fact
[CSSO](http://css.github.io/csso/) and
[css-ractionator](https://github.com/begriffs/css-ratiocinator) are
projects that do this exact thing.

So why didn't I build it that way?

## csscss forces me consider my (code) design ##

I built csscss as a tool to help a developer write smarter CSS.
Duplication isn't all bad, but we often write duplicated CSS
unknowingly. When I see duplicated CSS, it forces me to think about my
rules and structure. It forces me to ask myself several questions about
my code.

"Is this necessary?"

"Have I already defined a structure for this? Do I need to extend
existing structures?"

"Is there a better way to define the same rules?"

"Can I leverage other CSS tools to better structure these styles?
([Sass](http://sass-lang.com/), [LESS](http://lesscss.org/), etc)"

All of these answers reduce duplication, but more importantly, they
force me to consider the design of my code. And I don't think there is a
single algorithm that satisfies all cases.

Now you can obviously do this without an automated tool. And it is easy
for a small number of rules. However as your site/application grows it is
extremely difficult to continue this mental juggling.

I like to think of csscss as a tool that helps **extend my intuition**,
not replace it.

## Generated code is harder to debug ##

If csscss generated new duplication-free code, all I am doing is punting
work for later. Which usually comes up when I need to debug my styles
from the browser. If the generated output is substantially different
than the original source, it makes my job harder to fix my problems.

I have a similar problem with [coffeescript](http://coffeescript.org/),
though I still enjoy using it. The coffeescript I write and the
javascript I debug are different. Luckily, in that case I can follow the
flow enough to jump back to coffeescript to fix my bugs.

However the point of csscss is not to optimize code, it is to help
inform you about areas improvement. If csscss did this for you I expect
the gulf between original source and browser CSS to be rather large.

## Improving the CSS landscape ##

None of this is a knock against other developers working on the same
problem. In fact, I think different perspectives and trial/error in this
field can only be a good thing. CSS has been around for over a decade
and it surprising to me that we don't have more tools. So I commend
anyone spending time to contribute. csscss is my contribution based on
my opinions.

Here are some others tools that people have mentioned since I released
csscss.

* [CSSO](http://css.github.io/csso/)
* [css-ractionator](https://github.com/begriffs/css-ratiocinator)
* [rework](https://github.com/visionmedia/rework)
* [helium](https://github.com/geuis/helium-css)
