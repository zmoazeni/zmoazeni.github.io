---
layout: post
title: MySQL and OSX
date: 2007-07-25 00:07:49.000000000 -04:00
---
I have some weird logic in determining what I compile and what I install via [ports](http://www.macports.org/)

Examples of things I typically compile by hand:
* Apache
* Ruby
* PHP
* SVN
* SQLite3

Examples of things I typically install via a Package or Ports
* MySQL
* PNG, JPEG, TIFF libraries
* Other low level libraries

I noticed when I installed MySQL 5.0.45 from the [package distribution](http://dev.mysql.com/downloads/mysql/5.0.html#macosx-dmg) I had some problems compiling against other libraries. It turns out that mysql will install itself in `/usr/local/mysql/`, and it's libraries in `/usr/local/mysql/lib` which is typical.

However I noticed I had problems compiling a lot of software that depended upon MySQL because they looked for those libraries in `/usr/local/mysql/lib/mysql`.

Two solutions:

1. Hunt down the config to specify `/usr/local/mysql/lib` instead of `/usr/local/mysql/lib/mysql`

OR

2. Just create the `mysql` directory in `/usr/local/mysql/lib` and inside that directory: `sudo ln -s ../*`

The lazy in me chose #2
