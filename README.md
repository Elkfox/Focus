# Concrete Popups
By [Elkfox](https://www.elkfox.com)

## Installation
### Requirements

  * jQuery >= 3.2.1
---

### Instructions
Grab `concrete.popup.js` or `concrete.popup.min.js` from the `dist/` folder. If you're just wanting to include a basic modal script on the your page include the following snippet in your index.html or other template file
```html
<script src="<path_to_javascript_files>/concrete.popup.min.js"></script>
```
or if you're using Shopify include the following in your theme.liquid just before the closing body tag (`</body>`)
```liquid
{{ 'concrete.popup.min.js' | asset_url | script_tag }}
```
 ----

## Setting up.

### Data API.
  If you have a popup but you only want to activate it whenever someone clicks a button then the easiest way to do it is by using data attributes. By giving the following data attributes to an html button we can open a modal with the id `#examplePopup` 
  
  The data attributes we'll be using are
  * `data-trigger="popup"`
  * `data-target="#examplePopup"`
  * `data-close`

  #### Example
  ```html
    <button class="popup-open-button" data-trigger="popup" data-target="#examplePopup">Click Me</button>
    <div class="popup" id="examplePopup">
      <h2>I am an example modal</h2>
      <button class="popup-close-button" data-close data-target="#examplePopup">Close Popup</button>
    </div>
  ```
  Now whenever someone clicks the "Click Me" button it will open the `#examplePopup` popup which contains a button to close the modal. Pretty easy!

---

### Javascript
  If you have a popup that you want to show whenever a specific event is triggered or whenever certain parameters are met you can do that just as easily as using javascript objects.

  #### Example
  Say we have a Shopify theme where we want a popup that contains the cart to appear whenever someone adds something to the cart. Assume that there is a fictitious jQuery event `itemAdded` that fires whenever someone adds something to the cart. This is what our popup might look like

  ```html
    <div class="cart-popup" id="cart">
      <a href="#" class="cart-popup__close-button" data-close data-target=".cart-popup">Close Cart</a>
      <div class="cart-popup__line-items">
        <!--- HTML That contains markup for cart line items-->
      </div>
      <div class="cart-popup__footer">
        <!-- HTML for cart popup footer that contains total, shipping and tax -->
      </div>
    </div>
  ```
  Below this HTML we can write the following script
  ```html
  <script type="text/javascript">
    var cartPopup = new Concrete.Popup('.cart-popup');
    $(document).on("itemAdded", function(e) {
      cartPopup.show();
    });
  </script>
  ```

---

## Todo

* Configuration variables
  * What should they be?
  * Allow them to be set via data-attributes and when creating a new Popup object.

* Include some CSS for people who don't have or want to write CSS for their popups.
  * Steal it from Reinforced Concrete.
