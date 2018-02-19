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
| visibleClass | `visible` | string | Set the visible class that gets added to show the popup. |
| bodyClass | `active-popup` | string | Class name applied to the body when the popup is opened. |
| innerSelector | `.popup-inner` | string | Set the selector for the area outside of the popup, when clicked the popup will close. |
| autoFocusSelector | `[data-auto-focus]` | string | Set the selector of an input field that you would like to be focused when the popup opens. |
| popupContent   | `.popup-content` | string | Set the selector of the popups content.  |
| avoidSubpixels | `false`  | boolean | Use javascript to stop the css from placing the popup on a subpixel value.
