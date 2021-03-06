---
title: Using Cucumber to test Generators
date: 2008-11-15 01:01:09.000000000 -05:00
---
I've been developing in Ruby (and Rails) for the past 2.5 years. Over time, I've molded my own flavor of CRUD controllers and resulting specs. Unfortunately, it's so different than the Rails and RSpec generated code that it takes me as long to alter the code as it does to create it from scratch. However, in laziness, I've pushed off writing my own generators. Until yesterday.

### The Issue ###

Now I'm not a big fan of generated code. However I do agree that the templates fit the basic CRUD functionality nicely. Despite their usefulness, one of the things that irks me about generators is making changes and not being confident if the code generated is valid. Parse errors, invalid logic, and variable misspellings are easy examples to get tripped up on. So I wanted these generators to be tested. Sounds odd doesn't it?

### Enter Cucumber ###

[Cucumber](http://github.com/aslakhellesoy/cucumber/wikis) is a recent project released that replaces the RSpec Stories Framework. You use it very similarly to the older Stories, but since Cucumber is written with [Treetop](http://treetop.rubyforge.org/) it provides a lot more niceties. I won't give a tutorial of Cucumber here (perhaps in another post), but I do want to illustrate the flexibility of the testing framework.

When first picking up Cucumber, the immediate use that comes to mind is Rails Integration testing (which it is very useful for). However it can also be applied to domains outside of Rails and even web development. When writing these generators I mainly wanted to know: "when I use a generator, is all the code valid, and do all the tests pass?".

Here's an example of using Cucumber to describe my intentions:

   Feature: Generating Controller Templates
     In order to generate standard CRUD controllers
     A Developer
     Should be able to generate a CRUD controller and the resulting specs

     Scenario: Generating Rails CRUD
       Given I'm using a Rails 2.2 code base
       When I generate 'my_controller customer'
       Then 'app/controllers/customers_controller.rb' should be created
       And 'spec/controllers/customers_controller_spec.rb' should be created
       And all the tests should pass

And here's the backing steps to accomplish the feature:

    Given(/^I'm using a (.*) code base$/) do |key|
      key = key.downcase.gsub(" ", "")
      available_codebases = { "rails2.2" => File.join(codebases_path, "2.2") }
      available_codebases.keys.should include(key)

      blast_and_create_tmp!
      extract_codebase!(key)
      @current_codebase = File.join(tmp_path, key)
    end

    When /^I generate '(.*)'$/ do |command|
      `#{@current_codebase}/script/generate #{command}`
    end

    Then /^'(.*)' should be created$/ do |file_path|
      File.exist?(File.join(@current_codebase, file_path)).should be_true
    end

    Then /^all the tests should pass$/ do
      output = `cd #{@current_codebase} && rake spec`
      output.should_not match(/\s0 examples/i)
      output.should match(/0 failures/i)
      $?.exitstatus.should == 0
    end

*I have all the code in [github](http://github.com/zmoazeni/my_styles/tree/master) if you want to see the working example of code.*

Pretty straightforward and sexy.
