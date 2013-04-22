---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Duplicate Test Names
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 23
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0yMw==
date: 2007-03-24 04:32:52.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
One of my biggest pet peeves of writing tests in ruby is based on something that makes ruby great. The openness of code. 


    ...
    
    def test_something
      # some assertions
    end
    
    ...
    
    def test_something
      # test with different assertions
    end
    
    ...


Perhaps it's my consistency towards test names or perhaps I'm focusing on the tree in the forest. But I've found myself in this problem more than a few times, editing the first test rather than the second, but the second essentially overrides the definition of the first. 

In order to help detect this, I created a [small rake task](http://source.elevatorfight.com/public/test_names/check_test_names.rake) that searches through all tests, and checks the uniqueness of the test names within a test case.

It does ignore commented methods, however right now only accounts for # .  

I may convert this into a plugin later, but until then save this in `RAILS_ROOT/lib/tasks`

    
    > rake test:check_names
    Everything looks good
    
    > rake test:check_names
    rake aborted 
    Multiple methods ["def test_something"] in test/unit/some_test.rb
    
    (See full trace by running task with --trace)
    


While this keeps an eye out for me, I'm still lazy enough not to run it all the time. I decided to make it a core task for [continuous integration](http://cerberus.rubyforge.org/), and then check it manually when I'm stumped why tests are not behaving as they should.
