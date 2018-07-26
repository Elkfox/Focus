---
title:  "Examples"
handle: "examples"
category: "examples"
---

#### Accordion open by default

<div class="demo-wrapper">
  <div data-trigger="accordion" data-target="#accordionExample" class="open">
    <span>
      Focus accordion example
      <span class="more">+</span>
      <span class="less">-</span>
    </span>
  </div>
  <div id="accordionExample" class="visible accordion-content">
    <div class="accordion-inner">
      Here is an example for focus being used as an accordion
    </div>
  </div>
</div>

<script>
  var accordionExample = new Focus('#accordionExample', {
    triggerClass: 'open',
    slide: true,
    visible: true
  });
</script>

{% highlight html %}
<div data-trigger="accordion" data-target="#accordionExample" class="open">
  <span>
    Focus accordion example
    <span class="more">+</span>
    <span class="less">-</span>
  </span>
</div>
<div id="accordionExample" class="visible accordion-content">
  <div class="accordion-inner">
    Here is an example for focus being used as an accordion
  </div>
</div>

<script>
  var accordionExample = new Focus('#accordionExample', {
    triggerClass: 'open',
    slide: true,
    visible: true
  });
</script>
{% endhighlight %}


#### Accordion closed by default
<div class="demo-wrapper">
  <div data-trigger="accordion" data-target="#accordionExampleClosed">
    <span>
      Focus accordion example
      <span class="more">+</span>
      <span class="less">-</span>
    </span>
  </div>
  <div id="accordionExampleClosed" class="accordion-content" style="display:none;">
    <div class="accordion-inner">
      <p>
        This accordion is close to start with
      </p>
      <p>  
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  </div>
</div>

<script>
  var accordionExampleClosed = new Focus('#accordionExampleClosed', {
    triggerClass: 'open',
    slide: true
  });
</script>

{% highlight html %}
<div data-trigger="accordion" data-target="#accordionExampleClosed">
  <span>
    Focus accordion example
    <span class="more">+</span>
    <span class="less">-</span>
  </span>
</div>
<div id="accordionExampleClosed" class="accordion-content" style="display:none;">
  <div class="accordion-inner">
    <p>
      This accordion is close to start with
    </p>
    <p>  
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</div>

<script>
  var accordionExampleClosed = new Focus('#accordionExampleClosed', {
    triggerClass: 'open',
    slide: true
  });
</script>
{% endhighlight %}
