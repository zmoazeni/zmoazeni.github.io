---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Combined PGP Keys Into One
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 122
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0xMjI=
date: 2008-02-18 23:18:11.000000000 -05:00
categories:
- Uncategorized
tags:
- elevatorup
comments: []
---
After finding out today that pgp keys can have multiple email addresses, I revoked all but public key and combined all emails into [one key](/assets/2008/2/19/zach.pub). 

### How

Edit a key in the terminal:


    > gpg --edit-key KEY_ID
    Command> adduid


Add name and email address. Then remember to set a primary uid:

    Command> uid NUMBER_IN_PARENTHS_TO_SELECT
    Command> primary
    Command> save

Should be all good. Remember to revoke the old keys and re-export the public key. 

### Additional Tip

You can share your public key with others easier by uploading it to a key server like [MIT](http://pgp.mit.edu/)
