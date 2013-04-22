---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Paranoid Testing
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 54
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD01NA==
date: 2007-05-22 23:09:12.000000000 -04:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
I had the opportunity to attend the [XP West Michigan](http://xpwestmichigan.org/) meeting tonight, and listen to the energetic speaker [Elisabeth Hendrickson](http://www.testobsessed.com/category/rumination/) from [Quality Tree Software](http://www.qualitytree.com/).

It was a great talk about the common mistakes in Agile Development. Hopefully her presentation will be available online soon. It's easy for agile developers to get puffed up and pat ourselves on the back because we write automated tests. Elisabeth highlighted important issues that agile development doesn't solve.

I especially liked her point about developers being on two sides of a scale. Either their too confident: in code, in deployment or in users interactions. Or they're too paranoid, writing tests to cover all possible scenarios. Striking a balance is difficult. 

I definitely have followed the path of the paranoid developer, trying to test as much as possible. Even in writing [Eventable](http://www.eventable.com) I have had to scale back the testing intensity. My problem always seems to be the test code becomes a weight dragging down the agility of the code. In essence more time is spent maintaining test code than the actual production code. 

I've tried following a few principles when writing tests.

### Test names should be close to readable sentences.

RSpec and BDD hit this right on the mark. Don't be scared of especially long method names. `test_users_should_have_multiple_emails` is extremely descriptive. And if you lose track of what you're really testing, the name will put you back on track. When trying to fix failing tests, expressive test names give me a good picture as to what functionality is broken.

### Keep the tests short. 

Tests should be the documentation for the code, and large tests are difficult to grok. I try to keep my tests under or around 5 lines. When it starts pushing 10 - 15 something needs to be abstracted, even if it's moving most related assertions into a method call used only by that one test. 

### Fire Copy and Paste

Copy and Paste are scam artists. They have no business in software development. If there was ever a gluttonous act for coders, it's to duplicate code and change only bare essentials. Be it production or test code (the latter being just as important) if you find yourself copying and pasting to add in a quick test, a flag should be raised.

<br />
<br />

## Update 5/24/07

Here are the [slides for her presentation](http://xpwestmichigan.org/files/Hendrickson_Bugs_We_Miss_v3.pdf).
