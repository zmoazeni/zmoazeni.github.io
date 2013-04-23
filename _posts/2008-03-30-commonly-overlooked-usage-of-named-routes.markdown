---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Commonly overlooked usage of named routes
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 134
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0xMzQ=
date: 2008-03-30 14:06:58.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
Given a route :

	ActionController::Routing::Routes.draw do |map|
	  map.foo "foo/:first/:second", :controller => "foo", :action => "something"
	end

Obviously you can pass in `:first` and `:second` via:

	foo_path(:first => "the first param", :second => "the second param")

However, for a more concise call, you can accomplish the same via:

	foo_path("the first param", "the second param")

It's not explicitly documented, but you end up doing the same thing with nested resource paths
