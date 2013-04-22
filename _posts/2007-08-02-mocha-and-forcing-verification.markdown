---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Mocha and Forcing Verification
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 72
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD03Mg==
date: 2007-08-02 22:26:18.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
I switched to [Mocha](http://mocha.rubyforge.org) about 5 months ago, and after getting over my preference for strict ordering, really enjoyed the library.

One problem I continue to have with the library is the silent failure of mocks if an assertion fails prior to the verification.

Looking at the code:

    class Car
      def initialize(parts = [])
        @parts = parts
      end
  
      def start
        started = true
        @parts.each do | part |
          # commenting out for failure
          # started = started && part.start
        end
  
        started
      end
  
    end
  
    class SomeTest < Test::Unit::TestCase
  
      def test_start
        engine_mock = mock("engine_mock")
        car = Car.new([engine_mock])
  
        engine_mock.expects(:start).returns(false)
        assert !car.start
      end
    end


I am left with a failing test that only provides information regarding the assertion failing. Now with this trivial case, I can look into the method to discover where my problem is, but generally I have to resort to inserting logging in order to discover the crux of my problem.

What I have typically done is in every TestCase I write is include a common teardown

    def teardown
      mocha_verify
    end


This will still error, but it will provide information about the mock failing as well as the assertion failing, which generally provides me quicker turn around in grokking why the test is failing in the first place. The only thing I don't like about this method, is that when you have a mock verification failure but all your assertions pass, you end up having duplicate Errors in the log. But I'm practical, and willing to live with that.

Getting tired of constantly having a common `teardown` in each test, I decided to crack open the hood of the library, and submit a patch<sup>[1](#fn1)</sup>. (Patches always seem to be the best conversation starter in open source projects.) However talking with [James Mead](http://blog.floehopper.org/) we seem to have a different points of view in terms of fast failing of the tests.

I respect the choice to not include the functionality into the core, but until I am convinced otherwise, I need more information from my tests. If your brain works anything like mine (which may be an insult), you can use this snipit of code to monkey patch your TestCases to force the verification, and still ensure the execution of your teardown code.

I must put up some disclaimers, I did **NOT** engineer this code, and I take no credit for the elegance in providing a AOP-like advice. This was completely ripped off from [Hardmock](http://hardmock.rubyforge.org/) written by the solid developers at [Atomic Object](http://atomicobject.com/)


    require "mocha"
    require "test/unit"
  
    class Test::Unit::TestCase
  
      def mocha_force_verify
        mocha_verify
      end
  
      if method_defined?(:teardown) then
        alias_method :old_teardown, :teardown
        define_method(:new_teardown) do
          begin
            mocha_force_verify
          ensure
            old_teardown
          end
        end
      else
        define_method(:new_teardown) do
          mocha_force_verify
        end
      end
      alias_method :teardown, :new_teardown
  
      def self.method_added(method) #:nodoc:
        case method
        when :teardown
          unless method_defined?(:user_teardown)
            alias_method :user_teardown, :teardown
            define_method(:teardown) do
              begin
                new_teardown 
              ensure
                user_teardown
              end
            end
          end
        end
      end
    end


Toss this bit of a code into a file and include it. This still has problems with the duplicate errors, but at least you don't have to remember to implement each test's teardown.


<div id="fn1">
  I do have to commend all the maintainers of Mocha for a quality job in the library and the supporting test suites.
</div>

### Update 8/10/07

I noticed a problem using this with rails 1.2.2 fixtures. Since both seem to use the same methodology. I'll try and provide an updated snipbit soon.

### Update 8/12/07

After banging my head trying to have both the Fixtures source and my code to sit on top of `method_added`, I decided to just monkey patch mocha. Just plop this into a file and require it before your test.


    require 'mocha'
    require 'mocha/expectation_error'
  
    module Mocha
      module ForceVerifyTestCaseAdapter
        def self.included(base)
          base.class_eval do
  
            def run(result)
              yield(Test::Unit::TestCase::STARTED, name)
              @_result = result
              begin
                mocha_setup
                begin
                  setup
                  __send__(@method_name)
                  mocha_verify { add_assertion }
                rescue Mocha::ExpectationError => e
                  added_mocha_failure = true
                  add_failure(e.message, e.backtrace)
                rescue Test::Unit::AssertionFailedError => e
                  add_failure(e.message, e.backtrace)
                rescue StandardError, ScriptError
                  add_error($!)
                ensure
                  begin
                    teardown
                  rescue Test::Unit::AssertionFailedError => e
                    add_failure(e.message, e.backtrace)
                  rescue StandardError, ScriptError
                    add_error($!)
                  end
                end
              ensure
                unless added_mocha_failure
                  begin
                    mocha_verify
                  rescue
                    add_error($!)
                  end
                end
                mocha_teardown
              end
              result.add_run
              yield(Test::Unit::TestCase::FINISHED, name)
            end
                  
          end
        end
      end
    end
  
    class Test::Unit::TestCase
      include Mocha::ForceVerifyTestCaseAdapter
    end
