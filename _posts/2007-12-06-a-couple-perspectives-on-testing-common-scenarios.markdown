---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: A couple perspectives on testing common scenarios
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 102
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0xMDI=
date: 2007-12-06 00:23:26.000000000 -05:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
### One Perspective

Suppose we have a Rails ActiveRecord model for a book:

    class Book < ActiveRecord::Base
      validates_presence_of :title
    end


Some people suggest testing the validation of the title by just checking to see if either A) `validates_presence_of(:title)` was called or B) whatever the side effect of `validates_presence_of(:title)` is present in the object (e.g. creating a method, adding an object to an array of validators, etc.) I believe their objective is to both DRY up their tests as well as not worrying about testing `validates_presence_of`, since that should already be tested by the framework.

I tend to disagree with this approach, and would much rather we test the behavior of a book. Let's instantiate a book without a title, and assert that it is in fact invalid.


    # for test/unit
    def test_books_should_require_titles
      book = Book.new(:title => nil)
      assert !book.valid?
      assert book.errors.on(:title)
    end

    # for rspec
    describe Book do
      it "should require titles" do
	book = Book.new(:title => nil)
	book.should have(1).error_on(:title)
      end
    end


While I do think the other approach is better than not testing at all, I believe testing the behavior in this case has a higher [expected value](http://en.wikipedia.org/wiki/Expected_value). In other words, I feel that divorcing the test from the particular implementation will make our test more robust than the former. The prime example I can see for this scenario is that testing the behavior will encompass both using `validates_presence_of` and any other form (in case our implementation is a bit more complex).

I can respect trying to DRY up the tests and not wanting to duplicate it for every attribute. For that I would suggest creating a helper that tests a series of attributes for you. Something like:

    describe Book do
      should_require(:title, :author, :published_at, :copyrighted_at)
    end


### Backpedaling a little

I actually use the first approach often when I'm testing my controllers. Usually when I want to focus on a testing an action in my controller, and I want to test it in isolation. However I do want to assert that a filter is assigned to that controller.

Suppose we had a controller for library on a college campus that only allowed Students and Faculty in:

    class LibraryController < ApplicationController
      before_filter :requires_students_or_faculty

      def checkout
	... implementation of the action ...
      end
    end


First I would assert that the library checks people, but I don't want to worry about it when I want to test `checkout`

    # Staying with RSpec
    describe LibraryController, "filters" do
      should_have_before_filter(:requires_students_or_faculty)
    end

    describe LibraryController, "something to do with checkout" do
      stub_all_filters!

      it "should redirect the patron outside after checking out a book" do
	... implementation of the test ...
      end
    end


Minor Note - `stub_all_filters!` runs through all filters and stubs them out so they all return `true`, making them irrelevant.

I'm not doing this in order to remove the responsibility of testing the the filter itself. I whole heartedly believe it should be tested too, but separating the tests can help avoid clunky tests with a lot of noise.

Another way to look at it, is to consider this perspective of "behavior". While I do agree that the filters contribute to the overall behavior of a controller, when I want to test a specific behavior (in this case, `checkout`), I don't want my tests to have to satisfy preconditions `requires_students_or_faculty`. For example, checking if a user is a student or faculty could be complex, and there's no reason to care about that when testing `checkout`
