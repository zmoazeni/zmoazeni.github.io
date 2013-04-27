---
layout: post
title: Subdomain Assertions
date: 2007-03-08 20:36:36.000000000 -05:00
---
Working with subdomains with rails can be easy, especially with [`url_for_domain`](http://wiki.rubyonrails.org/rails/pages/Url+for+domain). However testing can be a pain.

[`assert_redirected_to`](http://api.rubyonrails.com/classes/ActionController/Assertions/ResponseAssertions.html#M000203) helped when checking controller / action / parameters, but not asserting the subdomain. I rolled up a small assertion helper that can sit in `test_helper.rb`.


    def assert_redirect_url(options = {})
      opts = {:only_path => false, :controller => @controller.controller_name}.merge(options)
      assert_equal url_for(opts), @response.redirect_url, "Error matching redirect url"
    end

Example:


    assert_redirect_url(:subdomain => "test-subdomain",
      :controller => "test-controller", :action => "test-action")


### Update 3/21/07

I recently found that `assert_redirect_url` collides with an existing rails test helper that is deprecated in Rails 1.2.2. By putting this function definition at the bottom of `test_helper.rb` it will be overridden. Of course you can always use an arbitrary name and avoid any conflicts.
