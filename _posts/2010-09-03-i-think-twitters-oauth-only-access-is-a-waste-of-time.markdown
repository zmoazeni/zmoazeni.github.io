---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: I think Twitter's OAuth-only Access is a Waste of Time
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 373
wordpress_url: !binary |-
  aHR0cDovL3NpbXBsZWNoYXR0ZXIuY29tLz9wPTM3Mw==
date: 2010-09-03 15:41:57.000000000 -04:00
comments:
- id: 113
  author: Leon
  author_email: !binary |-
    aW5mb0BmbHV4Zm9yZ2UuY29t
  author_url: !binary |-
    aHR0cDovL3d3dy5mbHV4Zm9yZ2UuY29t
  date: !binary |-
    MjAxMC0wOS0wNCAwNjo0NTo1MCAtMDQwMA==
  date_gmt: !binary |-
    MjAxMC0wOS0wNCAxMDo0NTo1MCAtMDQwMA==
  content: ! '<p>I''m with you. The OAuth flow is just wrong for desktop apps. That
    PIN-handling is just a terrible idea.</p>

'
- id: 115
  author: Captain Jack
  author_email: !binary |-
    cG9AcG8ucG8=
  author_url: !binary ""
  date: !binary |-
    MjAxMC0wOS0wNiAxOToyMjoxNCAtMDQwMA==
  date_gmt: !binary |-
    MjAxMC0wOS0wNiAyMzoyMjoxNCAtMDQwMA==
  content: ! '<p>Is the issue not the giving of passwords to an app that will possibly
    steal it for nefarious use but the transmission of passwords in clear text over
    the internet when using basic auth?

    I think that is a much bigger security risk!</p>

'
- id: 116
  author: Zach Moazeni
  author_email: !binary |-
    emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
  author_url: !binary ""
  date: !binary |-
    MjAxMC0wOS0wNiAxOToyNjozMSAtMDQwMA==
  date_gmt: !binary |-
    MjAxMC0wOS0wNiAyMzoyNjozMSAtMDQwMA==
  content: ! '<p>@Captain Jack</p>


    <p>SSL secures plain text Basic Auth pretty well. OAuth vs Basic Auth is primarily
    about giving the service your password and the service abusing it.</p>

'
---
I don't normally write sensationalist articles, but today I'm going depart from the norm and make a bold claim: I think Twitter's [change to OAuth-only authentication](http://blog.twitter.com/2010/08/twitter-applications-and-oauth.html) is a waste of time for developers and businesses.

Don't get me wrong, I think the [OAuth spec](http://oauth.net/core/1.0/) is slick and has very good intentions at it's core. Nor am I knocking it out of inexperience, as I've been building OAuth based applications for the past 6 months. However my primary gripe with Twitter's OAuth-only stance boils down to [xAuth](http://dev.twitter.com/pages/xauth).

For those of you that aren't familiar with Twitter's recent change, before September 1st you could access their API by passing across your twitter username and password. This was fine if you were using your own credentials, however the Twitter ecosystem is rather large, and most people who interact with Twitter do it via a [3rd](http://itunes.apple.com/us/app/twitter/id333903271?mt=8) [party](http://iconfactory.com/software/twitterrific) [service](http://cotweet.com/). The security issue is handing your password to an untrusted source. As of September 1st however, developers are only allowed to access the API using [OAuth](http://dev.twitter.com/pages/auth_overview), which requires you to give your username and password _only_ to Twitter and then Twitter will authorize the application on your behalf. Even I admit, the protocol is rather elegant. When it comes to Web applications, I can hardly argue the security. The user is already in a browser and being directed to Twitter and back mostly only fires up User Experience guys.

However, I have a huge issue with [xAuth](http://dev.twitter.com/pages/xauth). xAuth is Twitter's solution to applications that have a large number of passwords already stored and allows the developers to convert them to OAuth-friendly keys behind the scenes. Well, from what I gather, that was the intended purpose. However there are many mobile Twitter applications out there _only_ are using xAuth. Why does this tick me off?

1) As a user, I'm still giving my password to the application. The application is not _supposed_ to store the credentials, however this is un-enforceable. At this point I'm only safe-guarded against applications that have their passwords stolen. I won't deny that's an issue, but not enough to force all developers to go OAuth-only.

2) Even [Twitter's official client](http://itunes.apple.com/us/app/twitter/id333903271?mt=8) requires me to hand over my password. If Twitter is going to take the stance that all API usage is going to go through OAuth, I think they should eat their own dog food and redirect me to a mobile browser.

Do I dislike OAuth? Certainly not. And I know Twitter has some brilliant talent. But if Twitter is going to make OAuth vs Basic Auth this big of a priority, I think they are missing mark by moving a lot of applications to xAuth.

--

You can also discuss this further on [Hacker News](http://news.ycombinator.com/item?id=1660851)
