---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Annotate Models Modification
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 27
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0yNw==
date: 2007-03-29 15:30:43.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
[annotate_models](http://svn.pragprog.com/Public/plugins/annotate_models) has been really useful for me. However when using [fixture_groups](/2007/3/29/fixture-groups) fixtures in subfolders are ignored. I modified the plugin slightly to include them. With luck these changes can be merged with [Dave Thomas's version](http://pragdave.pragprog.com).

Until then, here it is: [annotate_models](http://source.elevatorfight.com/public/annotate_models)


    ./script/plugin install \
      http://source.elevatorfight.com/public/annotate_models
