---
title: My Thoughts on Refinements
date: 2012-11-19 23:37:26.000000000 -05:00
layout: post
abstract: >
  Ruby 2.0 refinements have been a hot topic lately. Here are my
  thoughts on the debate.

---

I have followed the various Ruby 2.0 refinements discussion for a little
while now. There is certainly a lot of talk in the air for and against
the inclusion of this feature. For those tuning in, here are some
notable links to get you up to speed:

* [A presentation by Akira Matsuda at RubyConf
2012](https://speakerdeck.com/a_matsuda/ruby-2-dot-0-on-rails)
introducing refinements along with other interesting new Ruby 2.0
(potential) features.
* [A thorough
discussion](http://bugs.ruby-lang.org/issues/4085) by Ruby runtime
developers
* [Another RubyConf 2012
talk](http://www.confreaks.com/videos/1278-rubyconf2012-toward-a-design-for-ruby)
by Brian Ford a prominent [Rubinius](http://rubini.us/) developer.
* [A
blog post](http://blog.headius.com/2012/11/refining-ruby.html) by
Charles Oliver Nutter a prominent [JRuby](http://jruby.org/) developer.

I want to start off by saying, I have a ton of respect for the
incredible work all developers have put into making my job a reality.
The community wouldn't be where it is without all your hard work and
sweat. And my career certainly depends on the fruits of your labor.
Thank you.

There is an interesting mix of pros and cons for the inclusion of
refinements in Ruby 2.0. I'm going to distil what I've read and my
comments on the matter.

## Current discussions ##

### Implementation difficulties within MRI/JRuby/Rubinius/other ###

I'm just not qualified to weigh in on this area. I understand that there
are some (many?) challenges in implementing this fully without breaking
the [principal of least
surprise](http://en.wikipedia.org/wiki/Principle_of_least_astonishment)
for developers. That may or may not sway everything else. It should
certainly not be overlooked, but this isn't a scenario where you have
people proposing code without writing it. Runtime developers are
currently debating the feasibility implementation, and it does look
split.

### Crazy use cases ###

Many are cited on [Charles'
post](http://blog.headius.com/2012/11/refining-ruby.html) such as:

What does the following do?

<script src="https://gist.github.com/4110634.js?file=ref_1.rb"></script>

Josh Ballanco's example, also from Charles's post where


> "the following code only refines the "bar" method, not the "foo"
method." <script
src="https://gist.github.com/4110634.js?file=ref13.rb"></script>

I strongly dislike this argument. In complete fairness, you have no idea
what `String#upcase` is going to do. Someone before the call may or may
not have overriden the method. It could be
[`alias_method_chain'ed`](http://apidock.com/rails/ActiveSupport/CoreExtensions/Module/alias_method_chain)
to email my grandmother stock quotes upon invocation. No one knows. But
we still love Ruby, we still get work done, and we still ship code.

Thinking of obtuse edgecases on the nastiness or confusion this could
cause does not dismiss the potential possibilities. My initial reaction,
and I think this is shared with many developers, is "Wow, this could
really clean up some global-level monkey patching." That doesn't mean it
will be used only for the forces of good.

Myron [commented with some
guidelines](http://blog.headius.com/2012/11/refining-ruby.html?showComment=1353368146551#c3690449280229458677)
he uses when using monkey patching (which I think are great). But why
wouldn't the same apply to refinements?

Saying that refinements could lead to dangerous and unusuable code does
not dimiss the potential benefits of an incredibly flexible feature.
Describe some of the existing features to a non-Ruby developer and watch
their face either light up in possibility or scowl in disbelief. Like
re-opening classes

### What's wrong with monkey patching? ###

Brian Ford has asked this many times, and I don't think this is a great
question to lead to the dismissal of refinements. Monkey patching is
global and refinements are local to the call stack. I have not seen many
great arguments won based on the fact that we can accomplish the same
behavior through global means.

## Things we should be discussing ##

Aside from language-level implementation details which some language
developers seem to think isn't a problem and others do, I don't think
the many of the current questions and discussions are productive. These
are the topics I would like to hear discussed.

### Is Ruby too mature to include something so experimental? ###

This might seem like a trollish question, but I think needs serious
consideration. Ruby is not a young language with a small userbase. Sure
we might be small when compared to the sea of C code written and
deployed. But there is much more Ruby code in active use now than 5
years ago.

Changes this large has an affect on both the users who choose to use it,
as well as those who don't. Are we reaching the point where this is too
extreme? If so, where does an idea/implementation like this belong?

### Ruby compatibility ###

The implementation of refinements was first proposed and then
implemented by Shugo Maeda in MRI. Both JRuby and Rubinius have been
fighting for [RubySpec](http://rubyspec.org/) for many years, and there
has been no effort to spec this feature.

Think about that. A prominent MRI runtime developer thinks about an implements an
interesting feature, it is brought into the most popular runtime used,
and the developers tasked with keeping up compatible runtimes are now
forced to implement the same feature in their respective environments.

I get why JRuby and Rubinius developers would not be terribly motivated
to do that without an argument.

Here is where I think MRI and JRuby/Rubinius have competing goals. MRI
is continuing to push the boundaries of how to express the Ruby language
in new ways. Whereas JRuby/Rubinius are forced to play catch up with
large features. I don't mean that a knock against JRuby and Rubinius,
because they certainly bring their own unique things to the table. JRuby
has an amazing capacity for concurrency by leveraging the
[JVM](http://en.wikipedia.org/wiki/Java_virtual_machine) and Rubinius
has rethought even the simplest things such as a [fully supported
debugger](http://rubini.us/doc/en/tools/debugger/).

On top of playing catch up, JRuby/Rubinius continues to advocate to
developers to try their runtime and highlight successful production
uses. It's difficult to convince developers to use your runtime if you
have to change a large swath of code in the process.

This doesn't mean JRuby/Rubinius developers are fully biased against new
ideas.  It just means to me that they are heavily incentivized to fight
highly experimental features coming from a different runtime. Like
refinements.

### Communication ###

The number one thing I think we should be discussing is "How did we get
into this situation?" Many developers think refinements can be used in
good/productive ways (myself included), but why are many smart, respected developers
vehementely against it? Apart from language maturity or incentives
for/against, I think this entire argument suffers from what countless
arguments in the past suffer from: lack of communication.

MRI is largely written by Japanese developers, but has become heavily
adopted in the United States. JRuby/Rubinius developers are
predominately English speaking. There are many developers who speak
multiple languages, but not enough.

Brian Ford mentioned this in the [talk I listed
above](http://www.confreaks.com/videos/1278-rubyconf2012-toward-a-design-for-ruby),
though I think he could have presented that topic in a much more
tactful, less rushed way. He proposes that we should all be discussing
these features in English.

If I was a Japanese MRI developer, I would be offended by the way that was
presented. First, there are many Japanese developers who have done a
great job discussing very complex topics in English, just browse
[ruby-lang](http://bugs.ruby-lang.org/issues). I think they should
be highlighted, or at least given some sort of props for their efforts.

Second, I can't help but put myself in their shoes. If I built some
awesome wizbat that I continued to care for but over the course of time
happened to be largely adopted by Russian developers. I would be a bit
upset if they criticized me for not discussing development issues in
Russian. Nothing against Russian, I just don't speak a lick of it.

On the other side of the coin, developers of JRuby and Rubinius are
being forced to implement some very difficult features in their
runtimes. Reading the dialog, it sounds like Charles' and Brian's
complaints are being heard but perhaps not discussed as thoroughly as
they probably should be.

I do not have any good suggestions for this problem. But I do think this
is the crux of it. In fact, this is most likely a frustration that has
been worked through for many years and refinements has now been the
place to plant the flag and have it out.

## Should refinements be in Ruby 2.0? ##

I think refinements offer some very interesting possibilities. It might
turn out to be a disaster or the to key to triggering some amazing
innovation in a caffeine-hyped developer. But instead of dividing the
community by campaigning for or against its inclusion. I think we should
be discussing matters that led us here, and will inevitably lead us to
other disagreements if left unresolved.
