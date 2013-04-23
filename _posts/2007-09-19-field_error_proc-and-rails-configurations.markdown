---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: field_error_proc and Rails Configurations
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 82
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD04Mg==
date: 2007-09-19 21:39:51.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
I came across something in Rails that's fixed an issue that has seriously irked me.

Given a form in Rails:

  ...
  <p>
    <label for="user_name">Name</label>
    <%= f.text_field :name %>
  </p>
  ...


if a validation error would occur, the generated code becomes:

    <p>
      <label for="user_name">Name</label>
      <div class="fieldWithErrors"><input id="user_name" name="user[name]" size="30" type="text" value="" /></div>
    </p>


Which is invalid markup. I've constantly resorted to editing rails source in order to change the divs to spans.

Today I came across something really neat: `field_proc_error`. By setting this in your configuration like `environment.rb`, you can drastically change the output of the generated error


    config.action_view.field_error_proc = Proc.new{ |html_tag, instance| "<span class=\"field_with_errors\">#{html_tag}</span>" }


Going through Trac, I see it's been in there forever, but as usual, I'm the last one to catch it.

Awesomely useful. Thanks Rails Core.
