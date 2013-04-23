---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Validates Presence Of Foreign Key
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 41
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD00MQ==
date: 2007-05-14 00:11:44.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
When reading the Rails documentation for [validates_presence_of](http://api.rubyonrails.com/classes/ActiveRecord/Validations/ClassMethods.html#M000941) I eyed the warning pertaining to foreign keys.

[![Rails Validation Warnings](/assets/2007/5/14/rails_validation_warnings_1.png "Rails Documentation for 1.2.3")](http://api.rubyonrails.com/classes/ActiveRecord/Validations/ClassMethods.html#M000941)

I came across [this article](http://blog.teksol.info/articles/2006/03/08/do-not-validate-belongs_to-or-else) and when running the examples written, I found the same errors.

Stumped, I started crawling through the Rails code. I documented the behavior [with this small rails app](/assets/2007/5/14/foreign_key_validations.tgz) which includes the Rails 1.2.3 frozen in<sup>[1](#fn1)</sup>.

Instead of using `invoice` and `line_items`, I decided to simply use `parent` and `child`

    Parent:
      class Parent < ActiveRecord::Base
	has_many :children
      end

    Child:
      class Child < ActiveRecord::Base
	belongs_to :parent
	validates_presence_of :parent, :name
      end

    Invalid Code:
      >> p = Parent.new(:name => "Dad")
      => #<Parent:0x23ac8f4 @attributes={"name"=>"Dad"}, @new_record=true>
      >> c = p.children.build(:name => "Son")
      => #<Child:0x2367858 @attributes={"name"=>"Son", "parent_id"=>nil}, @new_record=true>
      >> p.save!
      ActiveRecord::RecordInvalid: Validation failed: Children is invalid
	      from ./script/../config/../config/../vendor/rails/activerecord/lib/active_record/validations.rb:764:in `save_without_transactions!'
	      from ./script/../config/../config/../vendor/rails/activerecord/lib/active_record/transactions.rb:133:in `save!'
	      from ./script/../config/../config/../vendor/rails/activerecord/lib/active_record/connection_adapters/abstract/database_statements.rb:59:in `transaction'
	      from ./script/../config/../config/../vendor/rails/activerecord/lib/active_record/transactions.rb:95:in `transaction'
	      from ./script/../config/../config/../vendor/rails/activerecord/lib/active_record/transactions.rb:121:in `transaction'
	      from ./script/../config/../config/../vendor/rails/activerecord/lib/active_record/transactions.rb:133:in `save!'
	      from (irb):3

    Valid Code:
      >> p = Parent.new(:name => "Dad")
      => #<Parent:0x22b9f28 @attributes={"name"=>"Dad"}, @new_record=true>
      >> c = p.children.build(:name => "Son", :parent => p)
      => #<Child:0x229626c @attributes={"name"=>"Son", "parent_id"=>nil}, @parent=#<Parent:0x22b9f28 @attributes={"name"=>"Dad"}, @new_record=true, @children=[#<Child:0x229626c ...>]>, @new_record=true>
      >> p.save!
      => true


What seems to be happening is the validations are called twice. The first time with the parent_id of nil, and then the second with the parent_id (obviously now it's saved the Parent and is going to actually save the Child).

Perhaps later I will crawl through the Rails code and submit a patch to automate the setting of association variable, but I'm still debating if that's the correct thing to do.

What gets really odd is if I take out the @validate_presence_of@ from the Child and use the first method, both Parent and Child get saved, and the Child has the foreign key set.

    Parent:
      class Parent < ActiveRecord::Base
	has_many :children
      end

    Child:
      class Child < ActiveRecord::Base
	belongs_to :parent
	validates_presence_of :name
      end

    Valid Code:
      >> p = Parent.new(:name => "Dad")
      => #<Parent:0x23ac8f4 @attributes={"name"=>"Dad"}, @new_record=true>
      >> c = p.children.build(:name => "Son")
      => #<Child:0x2368dfc @attributes={"name"=>"Son", "parent_id"=>nil}, @new_record=true>
      >> p.save!
      => true
      >> p.children
      => [#<Child:0x2368dfc @attributes={"name"=>"Son", "id"=>2, "parent_id"=>2}, @new_record=false, @errors=#<ActiveRecord::Errors:0x233fe84 @errors={}, @base=#<Child:0x2368dfc ...>>>]

<div id="fn1"><sup>1</sup> To run the example:

    tar xvfz foreign_key_validations.tgz
    cd foreign_key_validations
    rake db:migrate
    rake test

</div>
