---
title: Simple Memoization in Scala
excerpt: An example of memoizing an expensive operation in Scala, similar to Ruby.
---

In Ruby, it's common to use instance variables and conditional assignment to
to concisely [memoize](http://en.wikipedia.org/wiki/Memoization) expensive
operations.

{% highlight ruby %}
class MemoizeSomething
  def initialize(x)
    @x = x
  end

  def somethingExpensive
    @somethingExpensive ||= begin
      puts("in here, going to sleep to calculate an 'expensive' operation")
      sleep(4)
      "the result: #{@x}"
    end
  end
end

o = MemoizeSomething.new("foo")
o.somethingExpensive # => "the result: foo"
{% endhighlight %}

You could reuse the same of strategy of detecting `nil`/`null` and conditionally
evaluating the result. However Scala has lazy evaluation built in. So you could
write the following:

{% highlight scala %}
class MemoizeSomething(x: String) {
  lazy val somethingExpensive = {
    println("in here, going to sleep to calculate an 'expensive' operation")
    Thread.sleep(4000)
    s"the result: $x"
  }
}

val o = new MemoizeSomething("foo")
o.somethingExpensive // res0: String = the result: foo
{% endhighlight %}

When `MemoizeSomething` is initialized, it won't evaluate `somethingExpensive`
right away, but the first time that variable is requested it will fully evaluate
it.

If you're not a fan of the closure above, you could also use a separate method:

{% highlight scala %}
class MemoizeSomething(x: String) {
  lazy val somethingExpensive = calcSomethingExpensive

  def calcSomethingExpensive: String = {
    println("in here, going to sleep to calculate an 'expensive' operation")
    Thread.sleep(4000)
    s"the result: $x"
  }
}

val o = new MemoizeSomething("foo")
o.somethingExpensive // res0: String = the result: foo
{% endhighlight %}
