---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Problems with Pound infront of Mongrel
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 70
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD03MA==
date: 2007-07-25 00:18:32.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
Working on a custom CMS, I was tasked to add a feature that allowed users to mark pages as secure. This allowed them to take sensitive data, and then turn around and email it plain text. Go figure.

My logic was simple.

* Allow the users to specify which pages are un/secure
* When visiting a page:
** If the page is secure, and they're not in a secure page redirect to https
** Else if the page is not secure and they're at a secure page redirect to http (Don't want any unnecessary encryption)
** Otherwise we're dandy

Well to develop this, I placed [Pound](http://www.apsis.ch/pound/) a really neat little load balancer, infront of a single Mongrel server, and created a self signed certificate. So far so good.

Then I spent the next few hours trying to figure out why my code was redirecting to the correct url, but the browser stayed in a tailspin.

First I thought maybe an obscure bug in Rails (I was using a pretty old version of the framework). Tests showed otherwise, and so did a sample dummy project using 1.2.3.

Then I suspected some crazy caching in firefox. Other browsers reproduced the same effect.

Finally, throwing up my hands I decided to just configure Apache to sit infront of a single Mongrel server. Works just fine.

I hope I can narrow down exactly what the issue is with Pound and Mongrel that doesn't allow Rails to redirect to the same url (except a change in the protocol), but as swamped as I am at work, that's a lofty goal.

I'm willing to bet that this behavior is only prominent when Pound sits directly infront of Mongrel(s), and not when Pound is infront of other servers like Apache, Lighttpd, Nginx, etc (which in turn sit infront of the Mongrel(s)). And I'm doubtful that there are many production deployments consisting of just Pound and Mongrel, but man it makes debugging a pain in the ass.
