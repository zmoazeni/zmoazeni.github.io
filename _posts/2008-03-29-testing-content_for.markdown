---
layout: post
title: Testing content_for
date: 2008-03-29 12:57:00.000000000 -04:00
---
After we started writing [view specs](/2008/2/16/ascribe-a-case-study-on-view-specs) we came across views similar to this:

	<p>Stuff in the main content area</p>

	<% content_for "secondary_content" do %>
	  <p>Stuff that will go in an side panel in the view </p>
	<% end %>

Obviously when rendering the view inside the spec, only the blurb about `main content area` will be in the `response.body`. For instance the second spec written will fail:

	describe "/path/to/view" do
	  def do_render
	    render "/path/to/view"
	  end

	  it "should have blurb about main content" do
	    do_render
	    response.should have_text(/main content/i)
	  end

	  ##
	  # This won't pass.
	  ##
	  it "should have blub about side panel" do
	    do_render
	    response.should have_text(/side panel/i)
	  end
	end

However, you can shove something in your `spec_helpers.rb` to test items inside the `content_for` blocks.

	def content_for(section)
	  template.send(:instance_variable_get, "@content_for_#{section}") || ""
	end

And rewrite your spec like this:

	describe "/path/to/view" do
	  def do_render
	    render "/path/to/view"
	  end

	  it "should have blurb about main content" do
	    do_render
	    response.should have_text(/main content/i)
	  end

	  ##
	  # This will now pass
	  ##
	  it "should have blub about side panel" do
	    do_render
	    content_for("secondary_content").should match(/side panel/i)
	  end
	end

The `have_text()` matcher won't work, but you can use the `have_tag()`.

If you haven't toyed with [content_for](http://api.rubyonrails.com/classes/ActionView/Helpers/CaptureHelper.html#M001069), I suggest looking into it. It will help clean and organize your views and layout(s).
