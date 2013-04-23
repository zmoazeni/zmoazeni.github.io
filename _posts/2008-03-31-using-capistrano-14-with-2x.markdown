---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Using Capistrano 1.4 with 2.x
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 136
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0xMzY=
date: 2008-03-31 10:48:41.000000000 -04:00
categories:
- Uncategorized
tags:
- code
comments: []
---
I typically use [Capistrano](http://www.capify.org/) for deploying our applications. Though I do have a bookmark to investigate [Vlad](http://rubyhitsquad.com/Vlad_the_Deployer.html) when I get some time.

We've been a bit slow to upgrade to Capistrano 2.x, and have a lot of existing applications that depend upon Capistrano 1.4 for deployment.

One tactic we've taken is to write a custom script to explicitly use 1.4 in conjunction with 2.x. A minor hack from the original, and we have:

	#!/usr/bin/env ruby

	begin
	  require 'rubygems'
	  gem 'capistrano', '<= 1.4.1'
	rescue LoadError
	  # no rubygems to load, so we fail silently
	end

	require 'capistrano/cli'

	Capistrano::CLI.execute!

I threw this into a script called `cap1.4` in `/usr/local` and can now do:

	illian:~ zach$ cap1.4 -V
	Capistrano v1.4.1
	illian:~ zach$ cap -V
	Capistrano v2.1.0

Obviously, a better approach would be to freeze in the capistrano gems per project, and access them via `RAILS_ROOT/script/cap`, but that too has been time sensitive. Notice a trend here?
