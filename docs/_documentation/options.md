---
title:  "Options"
handle: "options"
category: "options"
---

You may wish to configure your Focus element with some settings that are different to the defaults used above. You can control these on a per Focus element basis using the `Focus` constructor.

{% highlight javascript %}
  var scrollPopup = new Focus('#scrollPopup', {
    visibleClass: 'active',
    innerSelector: '.outer-popup',
    autoFocusSelector: '[name="search"]'
  });
{% endhighlight %}

| Option | Default | Type | Description |
| :----- | :------- | ----------- |
| bodyClass | `active-popup` | string | Class name applied to the body when the Focus element is opened. |
| targetClass | `null` | string | Set the target class that gets added to the Focus element trigger. |
| visibleClass | `visible` | string | Set the visible class that gets added to show the Focus element. |
| innerSelector | `.popup-inner` | string | Set the selector for the area outside of the Focus element, when clicked the Focus element will close. |
| autoFocusSelector | `[data-auto-focus]` | string | Set the selector of an input field that you would like to be focused when the Focus element opens. |
| slide   | `null` | boolean | Uses jQuery [slideDown](https://api.jquery.com/slideDown/) and [slideUp](https://api.jquery.com/slideUp/) functions for hiding and showing the focus element, useful for creating accordions.  |
| slideDuration   | `fast` | number/string | Set the speed of the jQuery slideDown and slideUp functions.  |
| detach | `null`  | boolean | Move the element to the end of the body on initialisation.
| visible | `false`  | boolean | Set to true if the focus element is visible by default.
| showCallback | `null`  | function | Callback function for when a popup is successfully shown.
| hideCallback | `null`  | function | Callback function for when a popup is successfully hidden.
| error | `null`  | function | Callback function for when a popup could not be hidden or shown.
