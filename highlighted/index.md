---
layout: default
title: Highlighted Articles
---

## Highlighted Articles ##

<div id="posts">
  {% for post in site.tags.highlighted %}
    <div class="post">
      <time datetime="{{post.date | date_to_xmlschema}}">{{ post.date | date_to_string }}</time>
      <span class="separator">⚡</span>
      <cite><a href="{{ post.url }}">{{ post.title }}</a></cite>

      {% if post.abstract %}
        <blockquote>{{ post.abstract }}</blockquote>
      {% endif %}
    </div>
  {% endfor %}
</div>