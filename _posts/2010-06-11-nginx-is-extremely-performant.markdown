---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Nginx is extremely performant
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 332
wordpress_url: !binary |-
  aHR0cDovL3NpbXBsZWNoYXR0ZXIuY29tLzIwMTAvMDYvbmdpbngtaXMtZXh0
  cmVtZWx5LXBlcmZvcm1hbnQv
date: 2010-06-11 13:10:16.000000000 -04:00
categories:
- Uncategorized
tags: []
comments: []
---
A couple days ago I wrote an article about [perceptions I've encountered as a freelancer](/2010/06/i-am-far-from-unemployed). The article took off on [Hacker News](http://news.ycombinator.com/), which a great feeling.

I received several thousand page views in the process. At first I was like "Wow!" and that quickly turned into "Oh crap..." I wasn't sure if my server hosting this blog would be able to handle that amount of traffic. But [Nginx](http://nginx.org/) handled it like a champ.

When I setup this blog, I found an excellent How-To article on setting up Wordpress on Nginx using FastCGI from [Aaron Schaefer](http://elasticdog.com/2008/02/howto-install-wordpress-on-nginx/). At the time this blog was using 5 PHP CGI processes and wasn't using any form of Wordpress page caching, however neither memory nor CPU broke a sweat. And I'm only running on a few hundred MBs.

I don't think Nginx is a perfect fit in every instance, however I'm really pleased with the results. I definitely recommend it to anyone else who is on the fence.
