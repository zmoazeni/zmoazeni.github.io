---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: ALIVE and Treetop
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 124
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD0xMjQ=
date: 2008-02-23 03:29:23.000000000 -05:00
categories:
- Uncategorized
tags:
- code
- elevatorup
comments: []
---
### A sweet project

I'm proud to say really fun mini-project went live today. [OKWU Alive](http://alive.okwu.edu/) for [Oklahoma Wesleyan University](http://www.okwu.edu/), a very forward thinking college. They wanted a site that is mainly updated by [twitter](http://twitter.com/) messages.

We used a combination of [Radiant](http://radiantcms.org/), [Twitter4R](http://twitter4r.rubyforge.org/), and an upcoming library [Treetop](http://treetop.rubyforge.org/) that I heard about a RubyConf 2007. Ever since attending [Nathan Sobo's presentation](http://rubyconf2007.confreaks.com/d1t1p5_treetop.html) I've wanted to put it to use, but kept putting it off.

### The "challenge"

To give some context to the site, OKWU wanted to parse direct twitter messages and add them to the site. The thing that made this interesting, is that they wanted to be able to tag each message. Most messages take on the form of:


    tag : message


Now I could obviously use regular expressions to parse out both the tag and the message, but what fun is that? 

### Treetop to the rescue

Treetop is structured to take a grammar file, that can be brought into ruby code. Here is the grammar we used to define the twitter message:


    grammar Twitter
      rule status
        tag delimiter message
      end
   
      rule tag
        [a-zA-Z_0-9-]+
      end
   
      rule message
        .*
      end
   
      rule delimiter
        space* ':' space*
      end
   
      rule space
        ' '
      end
    end


If you haven't worked with grammar specifications before, don't feel overwhelmed. What this essentially says is "a twitter status (another definition of a message from twitter) is composed of a tag followed by a delimiter followed by a message." With each part, you can find a more specific definition. For example, a tag can only take the form of alphanumerical characters, underscores and dashes.

### "Ok, that's neat, but how is it useful?"

The coolness comes in with the consumption of the grammar. Here's the code that uses Treetop:

    require "treetop"
    Treetop.load "twitter"
    
    parser = TwitterParser.new
    parsed_results = parser.parse("awesomified : you won't believe it's that easy")
    
    tag = parsed_results.get_tag
    message = parsed_results.get_message
    puts "message: #{message} classified under: #{tag}"


As you can see, Treetop loaded in the grammar and immediately gave me a `TwitterParser`. From there I parsed an example twitter message, and with the results I retrieved the tag and message.

### "Wait, how did you get the tag and message?"

Well, I didn't exactly show the entire grammar. Here's the final one:

    grammar Twitter
      rule status
        tag delimiter message {
          def get_tag
            tag.text_value
          end
   
          def get_message
            message.text_value
          end
        }
      end
   
      rule tag
        [a-zA-Z_0-9-]+
      end
   
      rule message
        .*
      end
   
      rule delimiter
        space* ':' space*
      end
   
      rule space
        ' '
      end
    end


Almost identical to the above except...it has friggin' ruby code attached! That means when given a status, I can call `#get_tag` and `#get_message` to return the items. Pretty doggone easy.

### "Impressive, but how is this better than just using regular expressions"

So I will not deny the same thing could be accomplished with a single regex, but this looks sexy. And it has additional benefits. Lets say in the future they want to:

* Allow multiple tags
* Allow spaces, and commas to be valid tag delimiters
* Allow the tags to be optional

Here's a grammar modified with those exact requests:

    grammar Twitter
      rule status
        (tags delimiter)? text {
          def get_tags
            if self.class.method_defined? "tags"
              tags.get_tags
            else
              []
            end
          end
  
          def get_message
            text.text_value
          end
        }
      end
  
      rule tags
        tag optional_tags:(optional_tag*) {
          def get_tags
            [tag.get_tag] + optional_tags.elements.map { |e| e.get_tag }
          end
        }
      end
  
      rule optional_tag
        tag_delimiter tag {
          def get_tag
            tag.text_value
          end
        }
      end
  
      rule tag
        [a-zA-Z_0-9-]+ {
          def get_tag
            text_value
          end
        }
      end
  
      rule text
        .*
      end
  
      rule delimiter
        space* ':' space*
      end
  
      rule space
        ' '
      end
  
      rule tag_delimiter
        space* ',' space* / space+
      end
    end


Some examples and their output:

    results = parser.parse("tag1 : the message")
    results.get_tags      # => ["tag1"]
    results.get_message   # => "the message"
    
    results = parser.parse("tag1 tag2, tag3 : the message")
    results.get_tags      # => ["tag1", "tag2", "tag3"]
    results.get_message   # => "the message"
    
    results = parser.parse("the message")
    results.get_tags      # => []
    results.get_message   # => "the message"
    
    results = parser.parse(": the message")
    results.get_tags      # => []
    results.get_message   # => ": the message"
    
    # Yea, well not bad for only 15 min, lets chalk the last one up to user-error.


I want to thank [Nathan Sobo](http://functionalform.blogspot.com/) for putting together such a useful and intuitive library. For more information about Treetop, you can check out the [site](http://treetop.rubyforge.org/) as well as the [mailing list](http://groups.google.com/group/treetop-dev).
