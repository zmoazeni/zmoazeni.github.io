---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Older Rails and Mongrel
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 52
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD01Mg==
date: 2007-05-21 23:20:09.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
One of the useful features of Rails servers (Webrick, Lighttpd, and Mongrel) is to see the development log going to standard out. However when using Rails before version 1.2 and Mongrel, you don't get that nicety.

I had to dip into a few applications using pre Rails 1.2, and having a separate terminal open for the log became annoying. This minor change keeps you from `tailing` in another terminal.

In `RAILS_ROOT/config/environments` create a new environment called `mongrel.rb`. Copy the contents of `development.rb` into it and throw this line at the bottom.

`config.logger = Logger.new(STDOUT)`

Then start Rails with `mongrel_rails start -e mongrel`
