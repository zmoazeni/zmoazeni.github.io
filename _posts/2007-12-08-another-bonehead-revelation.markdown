---
layout: post
title: Another bonehead revelation
date: 2007-12-08 23:35:55.000000000 -05:00
excerpt: Yep, I'm an idiot sometimes
---
### Ok, so I'm an idiot..

I've tried more than a few times to get a local version of [RDoc](http://ruby-doc.org/core/) with no luck. Sure I could generate the HTML, but the classes were missing very critical methods. Like [`String#split`](http://ruby-doc.org/core/classes/String.html#M000818).

Last night at Borders, I had an idea. What if I tried generating the docs from the source, rather than the installation? 'Lo and behold, that was exactly it. Gah, chalk another one up for me.

Hopefully I can garner a little respect by pointing others in the right direction who can't figure it out, and are as embarrassed as I was about asking for help.

### Steps to recreate docs

1. Download the [ruby source code](http://www.ruby-lang.org/en/downloads/)
1. Uncompress it and cd into the directory
1. Execute `rdoc --all -o ~/.rdoc`

It'll take a little while to generate, but you'll have your local version.
