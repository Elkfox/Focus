'use strict';

/* ===================================================================================== @preserve =
 ___  _   _    _
/   || | | |  | |
\__  | | | |  | |  __
/    |/  |/_) |/  /  \_/\/
\___/|__/| \_/|__/\__/  /\_/
              |\
              |/
Focus
version v2.0.7
https://github.com/Elkfox/Focus
Copyright (c) 2017 Elkfox Co Pty Ltd
https://elkfox.com
MIT License
================================================================================================= */

/*
  Manages visibility for popups, drawers, modals, notifications, tabs, accordions and anything else.
*/
var Focus = function focusVisibilityManager(target, config) {
  var settings = config || {};

  // The default configuration
  /*
    visibleClass: The class that will be applied to the target element.
    bodyClass: The class that will be applied to the body.
    triggerClass: The class that will be applied to the trigger that is clicked on.
    detach: if the body should be appended to the body.
    innerSelector: The outer area of the element, acts like a close button when clicked.
    autoFocusSelector: An input field that you would like to be focused with the element opens.
    slide: Whether the opening should be animated with javascript, useful for accordions.
    slideDuration: Speed of the animation, can be defined in ms.
    visible: Whether the element was loaded visible or not.
    success: Callback for when an element is success fully made visible.
    error: Callback fro when an element could not be made visible.
  */
  var defaultSettings = {
    visibleClass: 'visible',
    bodyClass: 'active-popup',
    triggerClass: null,
    detach: null,
    innerSelector: '.popup-inner',
    autoFocusSelector: '[data-auto-focus]',
    slide: null,
    slideDuration: 'fast',
    visible: false,
    showCallback: null,
    hideCallback: null,
    error: null
  };

  // Merge configs
  this.settings = Object.assign(defaultSettings, settings);

  // Update current popup config
  this.visible = this.settings.visible;
  // The Dom element of the popup
  this.element = document.querySelector(target);
  this.innerElement = document.querySelector(target + ' ' + this.settings.innerSelector);
  this.closeElement = document.querySelector(target + ' [data-close]');
  this.target = target;

  // Bind this into all of our prototype functions
  this.show = this.show.bind(this);
  this.hide = this.hide.bind(this);
  this.toggle = this.toggle.bind(this);
  this.detach = this.detach.bind(this);

  // If detach is set to true move the popup to the end of the popup
  if (this.settings.detach) {
    document.addEventListener('DOMContentLoaded', this.detach);
  }

  // Create a list of all of the currently active elements so that we can access them globally
  Focus.elements[target] = this;
};

// Create an empty object to store all of the elements in.
Focus.elements = {};

// Prevent default if the element is a link and return the selector of the popup element
Focus.getTarget = function getTheFocusElementRelatedToTheTarget(event) {
  var element = event.target;
  if (element.tagName === 'A') {
    event.preventDefault();
  }
  var selector = element.dataset.target;
  var target = selector || null;
  return target;
};

/*
  If the element does not exist then it is being fired directly from a data attribute.
  Therefore we create a new focus element. Then we toggle the elements visibility.
*/
Focus.eventHandler = function hideOrShowTheElement(event, target, method) {
  var focus = Focus.elements[target];
  if (!focus) {
    focus = new Focus(target);
  }
  if (method === 'hide') {
    return focus.hide();
  }
  return focus.toggle();
};
/*
  When clicking on a close button or out element
*/
Focus.closeEvent = function handleAnElementBeingClosed(event) {
  var target = Focus.getTarget(event);
  if (target) {
    Focus.eventHandler(event, target, 'hide');
  } else {
    this.hide();
  }
};

/*
  On key up event check if the user has pressed escape
*/
Focus.escEvent = function onKeyUpEscape(event) {
  if (event.keyCode === 27) {
    this.element.removeEventListener('keyup', Focus.escEvent);
    this.hide();
  }
};

/*
  Build the event listeners
*/
Focus.buildEventListeners = function bindFocusEventListeners() {
  var allTriggers = document.querySelectorAll('[data-trigger]');

  var _loop = function _loop(trigger) {
    var target = allTriggers[trigger].dataset.target;

    allTriggers[trigger].addEventListener('click', function (event) {
      Focus.eventHandler(event, target);
    });
  };

  for (var trigger = 0; trigger < allTriggers.length; trigger += 1) {
    _loop(trigger);
  }
};

/*
  Add a class to a given element
*/
Focus.addClass = function addAClassToAGivenElement(element, className) {
  var el = element;
  if (el.classList) {
    el.classList.add(className);
  }
};

/*
  Remove a class from a given element
*/
Focus.removeClass = function removeAClassFromAGivenElement(element, className) {
  var el = element;
  if (el.classList) {
    el.classList.remove(className);
  }
};

/*
  Show the popup element
*/
Focus.prototype.show = function showTheElement() {
  // Check if the element is visible or not.
  if (!this.visible || !this.element.classList.contains(this.settings.visibleClass)) {
    // Add the class to the trigger button if one is defined.
    if (this.settings.triggerClass) {
      var triggerElement = document.querySelector('[data-target="' + this.target + '"]');
      Focus.addClass(triggerElement, this.settings.visibleClass);
    }
    // If slide is set to true slide the element down.
    if (this.settings.slide) {
      this.element.slideDown(this.settings.slideDuration);
    }
    // Add the visible class to the popup
    Focus.addClass(this.element, this.settings.visibleClass);
    // Add the body class to the body
    Focus.addClass(document.body, this.settings.bodyClass);
    // Define that this element is visible
    this.visible = true;

    // Focus on an input field once the modal has opened
    var focusEl = document.querySelector(this.target + ' ' + this.settings.autoFocusSelector);
    if (focusEl) {
      setTimeout(function () {
        focusEl.focus();
      }, 300);
    }

    // When someone clicks the [data-close] button then we should close the modal
    this.closeElement.addEventListener('click', Focus.closeEvent.bind(this));
    // When someone clicks on the inner class hide the popup
    this.innerElement.addEventListener('click', Focus.closeEvent.bind(this));
    // When someone presses esc hide the popup and unbind the event listener
    this.element.addEventListener('keyup', Focus.escEvent.bind(this));

    // Fire the success callback
    if (this.settings.showCallback && typeof this.settings.showCallback === 'function') {
      this.settings.showCallback(this);
    }
  } else if (this.settings.error && typeof this.settings.error === 'function') {
    this.settings.error('Focus: Error this element is already visible', this);
  }
  // Return this so that we can chain functions together
  return this;
};

Focus.prototype.hide = function hideTheElement() {
  if (this.visible || this.element.classList.contains(this.settings.visibleClass)) {
    Focus.removeClass(this.element, this.settings.visibleClass);

    if (this.settings.triggerClass) {
      var triggerElement = document.querySelector('[data-target="' + this.target + '"]');
      Focus.removeClass(triggerElement, this.settings.visibleClass);
    }
    if (this.settings.slide) {
      this.element.slideUp(this.settings.slideDuration);
    }
    Focus.removeClass(document.body, this.settings.bodyClass);

    // When someone clicks the [data-close] button then we should close the modal
    this.closeElement.removeEventListener('click', Focus.closeEvent);
    // When someone clicks on the inner class hide the popup
    this.innerElement.removeEventListener('click', Focus.closeEvent);

    this.visible = false;
    // Fire the success callback
    if (this.settings.hideCallback && typeof this.settings.hideCallback === 'function') {
      this.settings.hideCallback(this);
    }
  } else if (this.settings.error && typeof this.settings.error === 'function') {
    this.settings.error('Focus: Error this element is already hidden', this);
  }
  return this;
};

/*
  Show if hidden, hide if shown.
*/
Focus.prototype.toggle = function toggleFocusVisibility() {
  if (this.visible) {
    this.hide();
  } else {
    this.show();
  }
  return this;
};

/*
  Move the element to the end of the body, sometime useful for popups.
*/
Focus.prototype.detach = function moveTheElementToTheEndOfTheBody() {
  document.body.appendChild(this.element);
  return this;
};

// Create event listeners for all triggers and closes on DOMContentLoaded
document.addEventListener('DOMContentLoaded', Focus.buildEventListeners);