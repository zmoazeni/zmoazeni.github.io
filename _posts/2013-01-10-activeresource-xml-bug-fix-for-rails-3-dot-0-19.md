---
title: "ActiveResource XML bug fix for Rails 3.0.19"
date: 2013-01-10T15:24:49+00:00
author: zach@getharvest.com
---

_Originally posted to [http://techtime.getharvest.com/blog/activeresource-xml-bug-fix-for-rails-3-dot-0-19](http://techtime.getharvest.com/blog/activeresource-xml-bug-fix-for-rails-3-dot-0-19)._

The past two weeks have been abuzz with security patches for Rails. [Yesterday's in particular](http://weblog.rubyonrails.org/2013/1/8/Rails-3-2-11-3-1-10-3-0-19-and-2-3-15-have-been-released/) is quite serious, and if you haven't upgraded yet, you really should.

This morning, we noticed an issue with a few of our applications that are still running Rails v3.0.x. There is currently a bug for security-patched Rails v3.0 applications serving XML data to ActiveResource consumers (think of a typical Rails XML API).

This bug was noticed [2 years ago](https://github.com/rails/rails/pull/492) by [jaw6](https://github.com/jaw6) and his fix was committed to Rails v3.2 and v3.1, but not v3.0. This wasn't an issue until yesterday's security upgrade.

Now if the latest version of ActiveResource requests XML data from a Rails v3.0 server, they may raise an odd error `Hash::DisallowedType: Disallowed type attribute: "yaml"`

We have just had a [pull request](https://github.com/rails/rails/pull/8853) merged into Rails that will fix this issue in v3.0.20 and should be released soon. Until then, if you need to apply this immediately you can have Bundler use this code directly from GitHub:

<pre><code>
# In your Gemfile
gem "rails", :git => 'https://github.com/rails/rails.git', :branch => '3-0-stable'
</code></pre>
