---
title: Detecting Scala Extension Classes at Runtime
layout: post
excerpt: An example of how to detect classes at runtime to implement a convention-over-configuration extension strategy in Scala (or Java).
---

Years ago, when I left Java for Ruby and Rails, I found Rails's opinions on [convention over configuration](http://en.wikipedia.org/wiki/Convention_over_configuration) very refreshing. I was tired of all the XML files needed for even the simplest Java architectures.

If you ignore the overengineered uses of XML, there's still something lacking with Java compared to Ruby when writing extendable software. Technically both languages are interpretted, however Java's only entry point is the initial `main()` method that runs at the begnning. Constrast that with Ruby, where every file that is loaded has the potential for changing the context of the runtime.

Some developers are revolted at Ruby's flexible nature, and while poorly written code can get squirrely and difficult to understand, I find that open execution context very useful in practice.

After coming back to the JVM and working with Scala, I was beginning to miss this feature from Ruby. Scala has an advantage over Java with its support for interpretting uncompiled files, but loading other uncompiled Scala files outside the REPL is difficult.

Java has some powerful reflection libraries though, both built into the standard library and without. One of these libraries I came across is [reflections](https://github.com/ronmamo/reflections) which provides enough tools to make some magic happen. You can check out some [example reflection code I put together](https://github.com/zmoazeni/reflections-example).

The technique is simple.

1. First we define an [base interface](https://github.com/zmoazeni/reflections-example/blob/master/reflections-base/src/main/scala/org/reflections_example/extension/BaseExtension.scala) that becomes an anchor so we can identify extension classes. This example uses a Scala trait, but you could use a Java interface. _In my example I also scope all extensions to a particular package for better performance._
2. We can then separately compile [a couple](https://github.com/zmoazeni/reflections-example/blob/master/reflections-extension/src/main/scala/org/reflections_example/extension/MyFirstExtension.scala) [extension classes](https://github.com/zmoazeni/reflections-example/blob/master/reflections-extension/src/main/scala/org/reflections_example/extension/MySecondExtension.scala) against our base code that implement that interface.
3. Now back in our `main()` method, we can use the reflections library to [find any extensions at runtime](https://github.com/zmoazeni/reflections-example/blob/master/reflections-base/src/main/scala/org/reflections_example/Main.scala#L9-L13), instantiate them, and run a common method that we define. This allows our extensions to bootstrap themselves however they need. For example, we could set up [pubsub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) in our original code to allow the extensions to modify the program behavior.

That's it. With this pattern you can dynamically extend a program at runtime just by dropping a jar in the classpath.

I suspect the same developers that abhor Ruby's per-required-file entry points that I described above will also dislike this strategy. But this just opens up the entry points for other code at runtime. You still have to build a design that lets extensions do anything meaningful.

As a concrete application, I'm considering using this for a rewrite of [csscss](/blog/2013/04/csscss/). With this design, I can write a base progam that only deals with CSS, but open up filetype recognition for extensions. Then other developers could write extensions for precompiling [SASS](http://sass-lang.com/), [LESS](http://lesscss.org/), [Stylus](http://learnboost.github.io/stylus/) or any other meta CSS language into CSS. And to enable one of those precompilers, a user would only have to download a jar for that extension and put it into a known directory.

No XML files. No configuration. It just works.
