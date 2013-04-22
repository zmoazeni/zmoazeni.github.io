---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Custom Textmate Commands
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 138
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0xMzg=
date: 2008-04-01 15:31:20.000000000 -04:00
categories:
- Uncategorized
tags:
- code
comments: []
---
[Textmate](http://macromates.com/) is a pretty decent editor for OSX. I'm not in love with it, but I use it frequently.

There is a plethora of plugins for Textmate to ease editing in different contexts, but sometimes you want to hack you're own commands.

For small scripting tasks, I tend to continue to use [ruby](http://www.ruby-lang.org/en/). So I enjoy it when I can continue using it for the commands.

You can typically use this shell for a ruby command, and your printed output gets replaced within Textmate:

	#!/usr/bin/env ruby
	$: << ENV['TM_SUPPORT_PATH'] + '/lib'
	input_from_tm = STDIN.read
	puts "hello world!"

Here is an example of code block toggling for Markdown.

	#!/usr/bin/env ruby
	$: << ENV['TM_SUPPORT_PATH'] + '/lib'
	
	s = STDIN.read
	ends_with_newline = s != s.chomp
	lines = s.split("\n")
	lines.each_with_index do |s, index|
	  s =~ /^(\t)?(.*)/
	  
	  if $1
	    print "#{$2}"
	  else
	    print "\t#{$2}"
	  end
	  
	  print "\n" if index != lines.size - 1
	end
	
	print "\n" if ends_with_newline

And a screenshot to include the Textmate command options:

<a href="/assets/2008/3/29/textmate_markdown_command.png"><img src="/assets/2008/3/29/textmate_markdown_command_small.png" alt="A picture of Textmate Bundle Editor"/></a>

