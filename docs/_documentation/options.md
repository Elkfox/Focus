---
title:  "Options"
handle: "options"
category: "options"
---

You may wish to configure your popup with some settings that are different to the defaults used above. You can control these on a per popup basis using the `Focus` constructor.

{% highlight javascript %}
  var scrollPopup = new Focus('#scrollPopup', {
    visibleClass: 'active',
    innerSelector: '.outer-popup',
    autoFocusSelector: '[name="search"]'
  });
{% endhighlight %}

| Option | Default | Type | Description |
| :----- | :------- | ----------- |
| bodyClass | `active-popup` | string | Class name applied to the body when the popup is opened. |
| targetClass | `null` | string | Set the target class that gets added to the popup trigger. |
| visibleClass | `visible` | string | Set the visible class that gets added to show the popup. |
| innerSelector | `.popup-inner` | string | Set the selector for the area outside of the popup, when clicked the popup will close. |
| autoFocusSelector | `[data-auto-focus]` | string | Set the selector of an input field that you would like to be focused when the popup opens. |
| slide   | `null` | boolean | Uses jQuery [slideDown](https://api.jquery.com/slideDown/) and [slideUp](https://api.jquery.com/slideUp/) functions for hiding and showing the focus element, useful for creating accordions.  |
| slideDuration   | `fast` | number/string | Set the speed of the jQuery slideDown and slideUp functions.  |
| sticky | `null`  | boolean | Prevent popup from being relocated to the end of the body on init.
