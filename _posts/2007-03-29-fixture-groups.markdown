---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Fixture Groups
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 25
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0yNQ==
date: 2007-03-29 15:00:57.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
One of the things I like about working with Rails is test fixtures. However when the data model becomes more complex, the fixtures can become rather large. Worse yet, tests that require fixtures among two or more models feel clunky.

I wrote a plugin to help organize fixtures called [fixture_groups](http://source.elevatorfight.com/public/fixture_groups).


    ./script/plugin install \
      http://source.elevatorfight.com/public/fixture_groups


Example:


    class BlahTest
      fixture_group :group1
      fixtures :foo, :bar

      ...
    end


This will look in `RAILS_ROOT/test/fixtures/group1` for the fixtures. If a fixture_group isn't specified, then the fixtures will use the normal folder.


h3. Update 8/10/07

For the most part, I've given up on fixtures in my tests. Although I have it in my mind to check out [fixture scenarios](http://code.google.com/p/fixture-scenarios/) soon.
