---
layout: post
title: Liquid Forms
date: 2007-08-25 18:44:39.000000000 -04:00
---
A few weeks back I [wrote](/2007/8/liquids-leaking-from-a-developer) about using liquid. In the article I mentioned that soon I would write about how we integrated forms.

I've been purposely stalling for two reasons. One, I've been extremely busy at work, and two, I've been wanting to clean up some code and provide some helpers, but that doesn't look likely at least for some time.

Before I start, I need to give kudos to the Mephisto team for giving me a good launch pad in creating forms.

Here's an example tag.

    ##
    # In some other file
    ##
    class MyForm < Liquid::Block
      # I typically include these to allow most of the html tag helpers
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::FormTagHelper
      include ActionView::Helpers::FormOptionsHelper

      def render(context)

        # In the controller, pass the model along with the registers to be accessed
        # from the tag
        @model = context.registers[:model]

        # this will contain side affects.
        context.stack do
          context["form"] = {
            "first" => text_field_tag("model[first_field]", @model.first_field, :id => "model_first_field"),
            "second" => text_field_tag("model[second_field]", @model.second_field, :id => "model_second_field"),

            # This is some helper method used to generate an html output of
            # the validation errors
            "errors" => generate_validation_errors(@model),
            "submit" => submit_tag("Submit Form")
          }
        end

        result << %(
          <form method="post" action="#{context.url_for(:controller => "some_controller", :action => "some_action")}"
            #{render_all(@nodelist, context)}
          </form>
        )

        # this gets spit out to the view
        result
      end
    end

    ##
    # Somewhere in your config you need to register the tag
    ##
    Liquid::Template.register_tag(:myform, MyForm)


The first thing to do is to create a tag that inherits from `Liquid::Block`, and override the `render`. Next notice add a hash to the `context`. This directly defines what the templater can use. Also notice `render_all` inside the generated `form`. This allows the tag to pass the buck further on whatever it wraps, and obviously is extremely important.

For the most part that's it. The templater can then template a form similar to the following.

{% raw %}

    <div>
      {% my_form %}
        {{ form.errors }}

        <p>
          <label for="model_first_field">First Field</label>
          {{ form.first }}
        </p>

        <p>
          <label for="model_second_field">Second Field</label>
          {{ form.second }}
        </p>

        <p>
          {{ form.submit }}
        </p>
      {% end_my_form %}
    </div>

{% endraw %}


I think this is a pretty slick way of enabling templaters customization over the way forms are laid out structurally. Obviously there is a lot of room for improvement. Extracting more out of the tag to keep it dry. I've also thought about allowing filters to allow designers to manipulate all the other attributes of the elements like:

{% raw %}

    ...
    {{ form.first | html id:"new-id" class:"class_one class_two" style:"border: 1px solid"}}
    ...


{% endraw %}

I just haven't had any time to devote to liquid since we closed the last project that used it three weeks ago.

Finally you'll notice above that I'm calling `context.url_for`. That's not something that's baked into liquid, but something I monkey patched to provide the tags with Rails routes. It only expects that the controller gets passed as a register.

    class Liquid::Context
      def url_for(*options)
        @registers[:controller].send(:url_for, *options)
      end
    end
