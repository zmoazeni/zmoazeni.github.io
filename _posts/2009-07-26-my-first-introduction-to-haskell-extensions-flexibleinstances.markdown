---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: ! 'My First Introduction to Haskell Extensions: FlexibleInstances'
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 210
wordpress_url: !binary |-
  aHR0cDovL3NpbXBsZWNoYXR0ZXIuY29tLz9wPTIxMA==
date: 2009-07-26 20:28:53.000000000 -04:00
categories:
- Uncategorized
tags: []
comments: []
---
I've been tinkering with Haskell lately, and I came across an odd issue. Let's say I want to create a class that takes Integers, Characters, and Strings and returns an Integer.


	class Something a where
	  doSomething :: a -> Integer

	instance Something Integer where
	  doSomething x = 1

	instance Something Char where
	  doSomething x = 2

	instance Something [Char] where
	  doSomething x = 3

Trying to load this into the interpreter (or compiling it) results in the an error on the `String` (`[Char]`)

	Illegal instance declaration for `Something [Char]'
	  (All instance types must be of the form (T a1 ... an)
	  where a1 ... an are type *variables*,
	  and each type variable appears at most once in the instance head.
	  Use -XFlexibleInstances if you want to disable this.)
	In the instance declaration for `Something [Char]'

This cryptic message essentially means that I can't make `[Char]` an instance of the `Something` class, but I could make `[a]` one (a list containing any type)

	instance Something [a] where
	  doSomething x = 3

However that stinks because then I have to do a lot more work to differentiate between a list of characters (i.e. Strings) and a list of integers.

The error message mentions a way to disable that check, and the helpful guys at [`#haskell`](http://freenode.net/) gave me a hand.

If you put this at the top of your source file:

	{-# LANGUAGE FlexibleInstances #-}

you end up telling Haskell to load the extension `FlexibleInstances` which allows you to differentiate between lists of characters, integers, or whatever else. Which allows you to load in:

	-- in file TestingTypes.hs
	{-# LANGUAGE FlexibleInstances #-}

	class Something a where
	  doSomething :: a -> Integer

	instance Something Integer where
	  doSomething x = 1

	instance Something Char where
	  doSomething x = 2

	instance Something [Char] where
	  doSomething x = 3

	-- in ghci:
	Prelude> :l TestingTypes.hs
	[1 of 1] Compiling TestingTypes     ( TestingTypes.hs, interpreted )
	Ok, modules loaded: TestingTypes.
	*TestingTypes> doSomething 1
	1
	*TestingTypes> doSomething 'c'
	2
	*TestingTypes> doSomething "foo"
	3

Nothing ground breaking, but I thought I'd pass this tidbit along.
