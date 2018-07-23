/* ===================================================================================== @preserve =
 ___  _   _    _
/   || | | |  | |
\__  | | | |  | |  __
/    |/  |/_) |/  /  \_/\/
\___/|__/| \_/|__/\__/  /\_/
              |\
              |/
Focus
version v2.0.5
https://github.com/Elkfox/Focus
Copyright (c) 2017 Elkfox Co Pty Ltd
https://elkfox.com
MIT License
================================================================================================= */

const Focus = function(target, config) {
  const settings = config || {};
  this.target = target;
  // The Dom element of the popup
  this.element = document.querySelector(target);
  // The default configurtation
  const defaultSettings = {
    visibleClass: 'visible',
    bodyClass: 'active-popup',
    targetClass: null,
    detach: null,
    innerSelector: '.popup-inner',
    autoFocusSelector: '[data-auto-focus]',
    slide: null,
    slideDuration: 'fast',
    visible: false,
    callback: function(element) {
      element.show();
    }
  };

  // Merge configs
  this.settings = Object.assign(defaultSettings, settings);

  // Update current popup config
  this.visible = this.config.visible;

  // If detach is set to true move the popup to the end of the popup
  if(this.config.detach) {
    document.addEventListener("DOMContentLoaded", function(event) {
      document.body.appendChild(this.element);
    });
  };

  // Bind this into all of our prototype function
  this.show = this.show.bind(this);
  this.hide = this.hide.bind(this);
  this.toggle = this.toggle.bind(this);

  // Create a list of all of the currently active elements so that we can access them globally
  Focus.elements[target] = this;
}

// Create an empty object to store all of the elements in.
Focus.elements = {};

Focus.getTarget = function(element, event) {
  if (this.element.tagName == 'A') {
    event.preventDefault();
  };
  const selector = element.dataset.target;
  const target = selector ? selector : null;
  return target;
}
Focus.eventHandler = function(target, method) {
  var element = Focus.elements[target];
  if (!element) {
    var element = new Focus(target);
  }
  method === 'hide' ? element.hide() : element.toggle();
}
Focus.prototype.show = function() {
  var _this = this;
  if (!this.visible || !this.element.hasClass(this.config.visibleClass)) {
    if (this.config.targetClass) {
      jQuery('[data-target="'+this.target+'"]').addClass(this.config.targetClass);
    };
    if (this.config.slide) {
      this.element.slideDown(this.config.slideDuration);
    };
    this.element.addClass(this.config.visibleClass);
    jQuery('body').addClass(this.config.bodyClass);
    this.visible = true;

    // Focus on an input field
    if (jQuery(this.target + ' ' + this.config.autoFocusSelector).length) {
      setTimeout(function(){
        jQuery(_this.target + ' ' + _this.config.autoFocusSelector).focus();
      }, 300);
    }

    // When someone clicks the [data-close] button then we should close the modal
    this.element.on('click', '[data-close]', function (e) {
      var target = Focus.getTarget(jQuery(this), event);
      if (target) {
        Focus.eventHandler(target, 'hide');
      } else {
        _this.hide();
      }
    });

    // When someone clicks on the inner class hide the popup
    this.element.on('click', this.config.innerSelector, function (e) {
      if (jQuery(e.target).is(_this.config.innerSelector) || jQuery(e.target).parents(_this.config.target).length === 0) {
        _this.hide();
      }
    });

    // When someone presses esc hide the popup and unbind the event listener
    jQuery(document).on('keyup', this.element,  function (e) {
      if (e.keyCode === 27) {
        jQuery(document).off('keyup', this.element);
        _this.hide();
      }
    });
    return jQuery(document).trigger('focus:open', [this.target]);
  }
  return jQuery(document).trigger('focus:error', { error: 'Popup already open' });
}
Focus.prototype.hide = function() {
  if (this.visible || this.element.hasClass(this.config.visibleClass)) {
    this.element.removeClass(this.config.visibleClass);
    if (this.config.targetClass) {
      jQuery('[data-target="'+this.target+'"]').removeClass(this.config.targetClass);
    };
    if (this.config.slide) {
      this.element.slideUp(this.config.slideDuration);
    };
    jQuery('body').removeClass(this.config.bodyClass);

    // Unbind event listeners
    this.element.off('click', this.config.innerSelector);
    this.element.off('click', '[data-close]');

    this.visible = false;
    return jQuery(document).trigger('focus:close', [this.target]);
  }
  return jQuery(document).trigger('focus:error', { error: 'Focus element is already closed' });
}
Focus.prototype.toggle = function() {
  return this.visible ? this.hide() : this.show();
}
// Create event listeners for all triggers and closes on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(event) {
  const allTriggers = document.querySelectorAll('[data-trigger]');
  for (const i = 0; i < allTriggers.length; i++) {
    allTriggers[i].addEventListener('click', function() {
      const trigger = allTriggers[i].dataset.trigger;
      const target = Focus.getTarget(event);
    }
  }
  jQuery(document).on('click', '[data-trigger]', function(event) {
    var trigger = $(this).data('trigger');
    var target = Focus.getTarget(jQuery(this), event);
    Focus.eventHandler(target, 'toggle');
  });
  jQuery(document).on('click', '[data-close]', function(event) {
    var target = Focus.getTarget(jQuery(this), event);
    if (target) Focus.eventHandler(target, 'hide');
  });
});
