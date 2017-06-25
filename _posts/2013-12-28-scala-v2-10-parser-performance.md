---
title: Scala parser performance with v2.10.x
excerpt: A quick fix to a performance issue with Scala v2.10.x and JDK 7+
---

I have been tinkering with rewriting [csscss](/blog/2013/04/csscss/) in scala and have really enjoyed the language. Especially after working in Haskell. I noticed however that after upgrading my local java version to the latest v1.7 _(currently 1.7 update 45)_ my parsing performance tanked.

My toy parser is regex based, and I asked on the mailing list if there have been any recent regex changes. I was pointed to the following links:

* [http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6924259](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6924259)
* [http://java-performance.info/changes-to-string-java-1-7-0_06/](http://java-performance.info/changes-to-string-java-1-7-0_06/)
* [https://issues.scala-lang.org/browse/SI-7710](https://issues.scala-lang.org/browse/SI-7710)

Turns out in 1.7 update 6, the semantics of `String` changed:

> String.substring created a String, which shared an internal char[] value with an original String, which allowed you:
>
> 1. To save some memory by sharing character data
> 2. To run String.substring in a constant time ( O(1) )
>
> At the same time such feature was a source of a possible memory leak...
>
> [http://java-performance.info/changes-to-string-java-1-7-0_06/](http://java-performance.info/changes-to-string-java-1-7-0_06/)

The problem comes up when parsing in scala because `subSequence` (which depends on `substring`) is used heavily. So every parsing step would require at least O(n) of copying an array to a new array when creating a String.

In the [scala bug](https://issues.scala-lang.org/browse/SI-7710), the reporter mentioned writing a custom `CharSequence` that behaved the way same `String` used to to reclaim the performance.

Here is a snippet that did the trick for me:

{% highlight scala %}
import java.lang.CharSequence

class FastCharSequence(chars: Array[Char], val startBounds: Int, val endBounds: Int) extends CharSequence {
  def this(chars: Array[Char]) = this(chars, 0, chars.length)
  def this(input: String)      = this(input.toCharArray)

  def length(): Int = endBounds - startBounds

  def charAt(index: Int): Char = {
    if (index < length) {
      chars(index + startBounds)
    } else {
      throw new IndexOutOfBoundsException(s"$boundsInfo index: $index")
    }
  }

  def subSequence(start: Int, end: Int): CharSequence = {
    if (start >= 0 && start <= length && end >= 0 && end <= length) {
      new FastCharSequence(chars, startBounds + start, startBounds + end)
    } else {
     throw new IndexOutOfBoundsException(s"$boundsInfo start: $start, end $end")
    }
  }

  override def toString(): String = new String(chars, startBounds, length)

  private def boundsInfo = s"current: (startBounds: $startBounds, endBounds: $endBounds, length: $length, chars length: ${chars.length})"
}
{% endhighlight %}

Instead of parsing a String, you can wrap this around the String and parse that to reclaim performance.

This strategy may be [brought into scala v2.11](https://issues.scala-lang.org/browse/SI-7710), which should be released soon. But until then, you can use something similar.
