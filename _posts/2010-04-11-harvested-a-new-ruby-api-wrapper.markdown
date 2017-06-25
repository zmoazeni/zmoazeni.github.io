---
title: ! 'Harvested: A New Ruby API Wrapper'
date: 2010-04-11 14:17:02.000000000 -04:00
---
I've used [Harvest Time Tracking](http://www.getharvest.com/) for well over 3 years, and they have a quality product. They have also had a published API for quite some time. The past couple weeks I've been working on Ruby API wrapper for it, and today I've pushed the first release.

## Harvested ##

Harvested is a thin wrapper around their API based on HTTParty and HappyMapper.

You can go grab and install it through RubyGems (make sure the Gemcutter source is set):

     gem install harvested

A couple quick examples of how to use this API:

    require "harvested"
    harvest = Harvest.hardy_client('yoursubdomain', 'yourusername', 'userpassword', :ssl => false)

    # Print out all users, clients, and projects on the account
    puts "Users:"
    harvest.users.all.each {|u| p u }

    puts "Clients:"
    harvest.clients.all.each {|c| p c }

    puts "Projects:"
    harvest.projects.all.each {|project| p project }

More examples are included in `/examples` along with the gem.

## Standard Client vs Hardy Client ##

The guys at Harvest built a great API, but there are always dangers in writing code that depends on an API. For example, HTTP Timeouts, Occasional Bad Gateways, and Rate Limiting issues need to be accounted for.

There are two clients available in the gem, `client` and `hardy_client`. If you want to deal with the issues manually, feel free to use `client` otherwise `hardy_client` provides a friendly wrapper that retries errors and waits for rate limit resets.

## Links ##

* [Harvested Docs](http://rdoc.info/projects/zmoazeni/harvested)
* [Gem on Gemcutter](http://rubygems.org/gems/harvested)
* [Source Code on Github](http://github.com/zmoazeni/harvested)
* [Harvest API Docs](http://www.getharvest.com/api)
* [Mailing List for Harvested](http://groups.google.com/group/harvested)

## Update - 4/12/2010 ##

I started documenting the codebase, so I added a link to the [rdoc.info](http://rdoc.info) documentation.
