---
layout: post
title: Liquids leaking from a Developer
date: 2007-08-02 23:59:26.000000000 -04:00
---
After eyeing [Liquid](http://www.liquidmarkup.org/) for quite some time, we decided to use it on a project to allow a customer template his app from the admin side. After seeing a lot of documentation for Designers and Templaters, I felt there was something needed from a developer's perspective.

I want to extend a gracious "Thank You" to [Jaded Pixel](http://jadedpixel.com/) the creators behind [Shopify](http://shopify.com/) for taking to the time to extract this library from their own work, and provide it publicly.

Trying to jump into the library was a little difficult, and I learned a lot from just reading the source and the [documentation](http://liquid.rubyforge.org/), as well as the code for [Mephisto](http://mephistoblog.com/), one of the few open source projects that I know uses Liquid.

### Using Liquid

Using liquid is pretty straightforward. You have Liquid parse a template, and then render it giving the appropriate information


    Liquid::Template.parse(some_content_as_a_string).render(assigns, :registers => registers)


You notice that I pass Liquid two other items. `assigns` is a hash of available variables, objects or drops that the template can reference. `registers` is a hash of variables that are accessible from Drops, Tags, and Filters. Think of `assigns` as exposed to the template, and `registers` only used within the back-end processing of the template.

{% raw %}

    Liquid::Template.parse(some_content_as_a_string).render({"foo" => "bar"}, :registers => { "something" => "only in the backend"})

    ... in the template ...

    {{ foo }} # => "bar"
    {{ something }} # => ""
    {{ something_else_wacky }} # => ""

{% endraw %}


When passing an object in the assigns, it will check either the @to_liquid@ of the object, or check to see if it's a Drop

### Object#to_liquid

Most objects are expected to provide a `to_liquid` method that will convert itself into a hash which will permit the template access information from the object. No methods will be exposed to the outside, which is convenient for the sake of security.

Keep in mind, you don't need to provide a 1 to 1 mapping to liquid exposed methods to real methods. You can create additional items for the view.

{% raw %}

    class Dog
      def bark
        "woof"
      end

      def something_secure
        "don't touch"
      end

      def to_liquid
        { "bark" => "woof", "fetch" => "some newspaper"}
      end
    end

    Liquid::Template.parse(some_content_as_a_string).render({"dog" => Dog.new})

    ... in template ...

    {{ dog.bark }} # => "woof"
    {{ dog.something_secure}} # => ""
    {{ dog.fetch }} # => "some newspaper"

{% endraw %}


### Drops

Sometimes creating `to_liquid` is either more work than necessary, or you notice a lot of code regarding opening an object. Drops will help in these situations. A drop is an object that will expose all public methods to the template. I could easily rewrite the previous code as a drop (without having to write a `to_liquid` method)


{% raw %}

    class DogDrop < Liquid::Drop
      def initialize(dog)
        @dog = dog
      end

      def bark
        @dog.bark
      end

      def fetch
        "some newspaper"
      end
    end


    Liquid::Template.parse(some_content_as_a_string).render({"dog" => DogDrop.new(Dog.new)})

   ... in the template ...

    {{ dog.bark }} # => "woof"
    {{ dog.something_secure}} # => ""
    {{ dog.fetch }} # => "some newspaper"
    {{ dog.something_wacky }} # => ""

{% endraw %}


### Filters

Filters are a way of manipulating the output the input passed to it. They can be chained in any order without serious harm (though obviously you can write them in that fashion, I wouldn't suggest it).


{% raw %}

    module MyFilters
      def uppercase(text)
        text.upcase
      end

      def reverse(text)
        text.reverse
      end

      def replace_chars(text, item_to_replace, substitute)
        text.gsub(item_to_replace, replace_with)
      end
    end

    ... in template ...

    {{ dog.bark | uppercase }} # => "WOOF"
    {{ dog.bark | reverse }} # => "foow"
    {{ dog.bark | uppercase | reverse }} # => "FOOW"
    {{ dog.bark | replace_chars: 'w', 'b' }} # => "boof"

{% endraw %}

To use filters within the templates, you need to register them with Liquid


    Liquid::Template.register_filter MyFilters


### Tags

These are another core piece of liquid that are generally wrapped in {% raw %}`{% %}`{% endraw %}. You can see the implementation of control structures like `if`, `for`, `while` blocks. As well as other useful tags such as `capture`, `include` and `assign`. I suggest looking at the source for each of those to see how they are implemented, and how to pass parameters.

Later I will post on how to use tags to implement forms that are templatable by designers. (All credit goes to Mephisto for this one).

Creating forms with tags will essentially allow you to write a form like the following, which places a lot of needed control in the designer's hands.

{% raw %}

    {% myform %}
      <p>
        <label for="some_item">First Item</label> {{ form.first_item }}
      </p>

      <p>
        <label for="some_other_item">Second Item</label> {{ form.second_item }}
      </p>

      <p>
        <input type="submit" name="commit" value="Submit this Form" />
      </p>
    {% endmyform%}

{% endraw %}


### Filesystems

These are a neat concept that is only used for the `include` tags. You set a "filesystem" with Liquid by setting it to an object.


    Liquid::Template.file_system = MyFileSystem.new


Liquid will then pass all {% raw %}`{% include 'some_include' %}`{% endraw %} to the filesystem specified, which allows you to customize where the partial actually resides. For instance, to allow users to create templates from an interface and retrieve them from the database, you can implement a similar `filesystem`.

    class MyFileSystem
      def read_template_file(template_name)
        do_something_to_retreive_a_string_from_db(template_name)
      end
    end


Nothing extraordinary, but very useful. And of course the database isn't the only place you could store the includes.

All in all, a great library, and I plan to integrate templates with [Eventable](http://www.eventable.com) soon, since it was very successful with our previous project.

Thanks Jaded Pixel.
