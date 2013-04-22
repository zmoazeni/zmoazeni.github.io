---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Depth Merge
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 17
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0xNw==
date: 2007-03-13 14:00:48.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
[Merge](http://www.ruby-doc.org/core/classes/Hash.html#M002908) is rather useful, but it has the limitation of staying shallow. Here is a simple extension of an implemented depth merge, with one caveat. Passing in `true` to `delete_nils` will remove the key if the value is `nil`.

Install as a Rails plugin:

    ./script/plugin install http://source.elevatorfight.com/public/merge_extensions


To gut out the meat just grab [this file](http://source.elevatorfight.com/public/merge_extensions/lib/merge_extensions.rb)

An example of use:

    # Without trimming nils
    hash1 = { :a => "foo", :b => { :c => "bar"} }
    hash2 = { :b => { :c => "blah"} }
    hash1.depth_merge(hash2) #=> { :a => "foo", :b => { :c => "blah"} }

    # With trimming nils
    hash1 = { :a => "foo", :b => { :c => "bar"} }
    hash2 = { :b => nil }
    hash1.depth_merge(hash2, true) #=> { :a => "foo" }

Again a very simple utility, however it comes in handy with testing. 

    # In Model
    class Foo < ActiveRecord::Base
      validates_presence_of :col1, :col2
    end
    
    # In Unit Test
    ...
    def setup
      @default_attributes = { :col1 => "foo", :col2 => "bar" }
    end
    
    def test_missing_important_fields
      # A model with not only col1 == nil, but nil is never passed to the setter
      model = create_model(:col1 => nil)
      # do some checking on validity
      
      model = create_model(:col2 => nil)
      # again checking on validity
    end
    
    def test_something_else
      model = create_model
    end
    
    private
      def create_model(opts = {}) 
        SomeModel.new(@default_attributes.depth_merge(opts, true))
      end
    ...
  

Having a the depth part of the merge many not be handy in that scenario, but in functional tests they can help with composing the `get`/`post`

    # In Functional Test
    ...
    def setup
      ...
      @default_params = { 
        :id => 5, 
        :foo => {
          :col1 => "foo",
          :col2 => "bar"
        }
      }
    end
    
    def test_something
      post :some_action, params(:foo => { :col1 => nil })
      ...
    end
    
    def test_something_else
      post :some_action, params
      ...
    end
    
    private
      def params(opts = {})
        @default_params.depth_merge(opts, true)
      end
    ...


The premise for this is so tests become more concise, leaving only relevant information. Which in turn make the tests more readable.
