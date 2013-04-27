---
layout: post
title: Dumb Moments
date: 2007-04-17 10:19:20.000000000 -04:00
---
As a developer you face many situations where things will just not work, then you have a revelation that points to something so simple that you want to slap yourself.

I just had one today so profound I thought I'd share it with the public.

I wanted to have fun on my day off, but instead of going outside on the beautiful day, or doing some thing active like any sane person, I decided to play with [FlexMock](http://onestepback.org/software/flexmock/) and [Mocha](http://mocha.rubyforge.org/).

I had my fun with FlexMock and was moving onto Mocha, when I encountered a strange yet irritating problem.

    require "rubygems"
    require "test/unit"
    require "mocha"
    require "others"

    class OthersTest < Test::Unit::TestCase

      def test_foo
	person = mock("person")
      end
    end

I kept getting

    E
    Finished in 0.000419 seconds.

      1) Error:
    test_foo(OthersTest):
    NoMethodError: undefined method `mock' for #<OthersTest:0x110b5c4>


So I went over my gems to make sure they were installed correctly. Even grabbed a [sample test file](http://mocha.rubyforge.org/examples/mocha.html) and that resulted in the same error.

So I edited the `mocha.rb` in the gem `lib` directory and added one of my Yoda-like scientific debugging techniques

    puts "in here"


Still having problems. So I tweaked the test case a little to

    require "rubygems"
    require "test/unit"
    require_gem "mocha"
    require "others"


Success! ... if you ignore the Deprecation Warning from rubygems. `Warning: require_gem is obsolete.  Use gem instead.` Being a perfectionist, that irked me.

Wondering how this gem could hate me in particular yet spare everyone else it's wrath, I stepped back and noticed the forest for the trees. The test's filename was `mocha.rb`. An innocuous file name from a sleepy eyed programmer at 8 a.m. in the morning. (More support that coders shouldn't touch a keyboard before 10 a.m.)

The original `require "mocha"` was seeming to ignore the gem because it was named the same, and of course I plopped the sample file in the same directory as the uglified test, so it wouldn't grab the gem.

Why do Dumb Moments always last at least one hour?
