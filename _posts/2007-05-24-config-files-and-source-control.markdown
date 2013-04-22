---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Config Files and Source Control
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 56
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD01Ng==
date: 2007-05-24 01:33:01.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
Environment specific configuration files can be a pain in version control. Especially when multiple developers keeps clobbering each other on updates. 

At Elevator Up we use Subversion almost exclusively. One useful approach is to first `svn:ignore` each config file. With Rails applications I usually ignore:

* `database.yml` - Database connection for Rails 
* `deploy.rb` - Capistrano Deployment Recipe
* `httpd.conf` - Apache VHost configuration
* `mongrel_cluster.yml` - Mongrel Cluster Config
* Any `.so`, `.dll`, or `.bundle` sitting in `RAILS_ROOT/lib`

Then I save specific names for the environments they are used in. Most times with Elevator Up applications we have at least 3 environments:

* My Development Box
* Pre-Production Machine
* Production Machine

I append the environment as an extension to the file, and throw those into version control. 

* `database.yml.zach`
* `database.yml.preprod`
* `database.yml.prod`

Then I either create a symbolic link to the file I want to use (or if in Windows environment, copy the file).

It may seem silly at first to have different copies of the file in version control, however I've found at least these benefits:

* Database Config - Username / Password / Database Names / Database Engines change per machine
* Deploy Scripts - Allow you to choose what is getting deployed `cap -f config/deploy.rb.prepod deploy`
* Apache Config - IP Addresses in VHost are almost always different
* Mongrel Cluster - Along with IP Addresses, Mongrel Ports may also be different

