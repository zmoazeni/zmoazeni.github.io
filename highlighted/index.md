---
title: Highlighted Articles
---

## Highlighted Articles ##

<div id="posts">
  {% for post in site.tags.highlighted %}
    <div class="post">
      <time datetime="{{post.date | date_to_xmlschema}}">{{ post.date | date_to_string }}</time>
      <span class="separator">ϟ</span>
      <cite><a href="{{ post.url | prepend:site.baseurl }}">{{ post.title }}</a></cite>

      {% if post.excerpt %}
        <blockquote>{{ post.excerpt }}</blockquote>
      {% endif %}
    </div>
  {% endfor %}
</div>
