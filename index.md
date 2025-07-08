---
layout: home
title: Home
date: 2025-07-08
---

# Benvenuto nel mio blog

Qui scrivo i miei pensieri, riflessioni e articoli.

{% for post in site.posts %}
<article>
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <small>Pubblicato il {{ post.date | date: "%d %B %Y" }}</small>
  <p>{{ post.excerpt }}</p>
</article>
<hr>
{% endfor %}