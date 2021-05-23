/* ===================================================================================== @preserve =
 ___  _   _    _
/   || | | |  | |
\__  | | | |  | |  __
/    |/  |/_) |/  /  \_/\/
\___/|__/| \_/|__/\__/  /\_/
              |\
              |/

Focus
version v2.3.2
https://github.com/Elkfox/Focus
Copyright (c) 2018 Elkfox Co Pty Ltd

https://elkfox.com
Project lead: Oscar Strangio
MIT License
================================================================================================= */

/*
  Manages visibility for popups, drawers, modals, notifications, tabs, accordions and anything else.
*/
const Focus = function focusVisibilityManager(target, config) {
    const settings = config || {};

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
    const defaultSettings = {
        visibleClass: 'visible',
        bodyClass: 'active-popup',
        triggerClass: null,
        detach: null,
        innerSelector: '.popup-inner',
        autoFocusSelector: '[data-auto-focus]',
        slide: null,
        slideSpeed: 200,
        visible: false,
        showCallback: null,
        hideCallback: null,
        error: null,
    };

    // Merge configs
    this.settings = Object.assign(defaultSettings, settings);

    // Update current popup config
    this.visible = this.settings.visible;

    // The Dom element of the popup
    this.element = document.querySelector(target);
    this.innerElement = document.querySelector(`${target} ${this.settings.innerSelector}`);
    this.closeElement = document.querySelector(`${target} [data-close]`);
    this.target = target;

    if (this.settings.slide) {
        const defaultDisplay = this.element.style.display;
        this.element.style.display = 'block';
        this.maxHeight = this.element.offsetHeight;
        this.element.style.display = defaultDisplay;
        this.height = this.element.offsetHeight;
        this.counter = this.height;
    }

    // Bind this into all of our prototype functions
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
    this.detach = this.detach.bind(this);
    this.slideDown = this.slideDown.bind(this);
    this.slideUp = this.slideUp.bind(this);
    this.boundCloseEvent = Focus.closeEvent.bind(this);
    this.boundEscListener = Focus.escEvent.bind(this);

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
    const element = event.target;
    if (element.tagName === 'A') {
        event.preventDefault();
    }
    const selector = element.dataset.target;
    const target = selector || null;
    return target;
};

/*
  If the element does not exist then it is being fired directly from a data attribute.
  Therefore we create a new focus element. Then we toggle the elements visibility.
*/
Focus.eventHandler = function hideOrShowTheElement(event, target, method) {
    event.preventDefault();
    let focus = Focus.elements[target];

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
    if (event.currentTarget !== event.target) {
        return;
    }
    event.preventDefault();
    const target = Focus.getTarget(event);

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
    const allTriggers = document.querySelectorAll('[data-trigger]');
    for (let trigger = 0; trigger < allTriggers.length; trigger += 1) {
        const {target} = allTriggers[trigger].dataset;
        allTriggers[trigger].addEventListener('click', (event) => {
            Focus.eventHandler(event, target);
        });
    }
};

/*
  Add a class to a given element
*/
Focus.addClass = function addAClassToAGivenElement(element, className) {
    const el = element;
    if (el.classList) {
        el.classList.add(className);
    }
};

/*
  Remove a class from a given element
*/
Focus.removeClass = function removeAClassFromAGivenElement(element, className) {
    const el = element;
    if (el.classList) {
        el.classList.remove(className);
    }
};

Focus.prototype.slideDown = function slideDown() {
    const el = this.element;
    // Display none
    const defaultDisplay = this.element.style.display;

    el.style.display = 'block';
    el.style.overflow = 'visible';
    el.style.maxHeight = '100%';
    // Declare the value of "height" variable
    this.maxHeight = el.offsetHeight;
    el.style.display = defaultDisplay;
    this.height = el.offsetHeight;
    // Declare the value of "counter" variable
    this.counter = this.height;
    el.style.maxHeight = `${this.height}px`;
    el.style.overflow = 'hidden';
    el.style.display = 'block';

    const adder = this.maxHeight / 100;
    // Iteratively increase the height
    this.interval = setInterval(() => {
        this.counter += adder;
        if (this.counter < this.maxHeight) {
            el.style.maxHeight = `${this.counter}px`;
        } else {
            el.style.maxHeight = null;
            el.style.overflow = null;
            this.height = this.element.offsetHeight;
            clearInterval(this.interval);
        }
    }, this.settings.slideSpeed / 100);
};

Focus.prototype.slideUp = function slideUp() {
    const el = this.element;
    const subtractor = this.maxHeight / 100;
    // To hide the content of the element
    el.style.overflow = 'hidden';

    // Decreasing the height
    this.interval = setInterval(() => {
        this.counter -= subtractor;
        if (this.counter > 0) {
            el.style.maxHeight = `${this.counter}px`;
        } else {
            el.style.maxHeight = null;
            el.style.display = 'none';
            el.style.overflow = null;

            clearInterval(this.interval);
        }
    }, this.settings.slideSpeed / 100);
};

/*
  Show the popup element
*/
Focus.prototype.show = function showTheElement() {
    // Check if the element is visible or not.
    if (!this.visible || !this.element.classList.contains(this.settings.visibleClass)) {
        // Add the class to the trigger button if one is defined.
        if (this.settings.triggerClass) {
            const triggerElement = document.querySelector(`[data-target="${this.target}"]`);
            Focus.addClass(triggerElement, this.settings.triggerClass);
        }
        // If slide is set to true slide the element down.
        if (this.settings.slide) {
            this.slideDown(this.settings.slideDuration);
        }
        // Add the visible class to the popup
        Focus.addClass(this.element, this.settings.visibleClass);
        // Add the body class to the body
        Focus.addClass(document.body, this.settings.bodyClass);
        // Define that this element is visible
        this.visible = true;

        // Focus on an input field once the modal has opened
        const focusEl = document.querySelector(`${this.target} ${this.settings.autoFocusSelector}`);
        if (focusEl) {
            setTimeout(() => {
                focusEl.focus();
            }, 300);
        }

        if (this.closeElement) {
            // When someone clicks the [data-close] button then we should close the modal
            this.closeElement.removeEventListener('click', this.boundCloseEvent);
            this.closeElement.addEventListener('click', this.boundCloseEvent);
        }

        if (this.innerElement) {
            // When someone clicks on the inner class hide the popup
            this.innerElement.removeEventListener('click', this.boundCloseEvent);
            this.innerElement.addEventListener('click', this.boundCloseEvent);
        }

        // When someone presses esc hide the popup and unbind the event listener
        this.element.removeEventListener('keyup', this.boundEscListener);
        this.element.addEventListener('keyup', this.boundEscListener);

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
            const triggerElement = document.querySelector(`[data-target="${this.target}"]`);
            Focus.removeClass(triggerElement, this.settings.triggerClass);
        }
        if (this.settings.slide) {
            this.slideUp(this.settings.slideDuration);
        }
        Focus.removeClass(document.body, this.settings.bodyClass);

        // When someone clicks the [data-close] button then we should close the modal
        if (this.closeElement) {
            this.closeElement.removeEventListener('click', Focus.closeEvent);
        }
        // When someone clicks on the inner class hide the popup
        if (this.innerElement) {
            this.innerElement.removeEventListener('click', Focus.closeEvent);
        }

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

// NPM exports
module.exports = Focus;
