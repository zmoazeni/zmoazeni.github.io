---
layout: post
title: Commonly overlooked usage of named routes
date: 2008-03-30 14:06:58.000000000 -04:00
excerpt: Routing fun
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
