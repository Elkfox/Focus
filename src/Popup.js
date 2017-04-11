const Util = require('./Util.js');
const jQuery = require('jquery');

module.exports = (() => {
  const DEFAULT_CONFIG = {
    visibleClass: 'visible',
  }; // We don't actually have a real config yet.

  const DATA_KEY = 'concrete.popup';

  class Popup {
    constructor(target, config = {}) {
      this.target = target;
      this.element = jQuery(this.target);
      this.config = Object.assign({}, DEFAULT_CONFIG, config);
      this.isVisible = false;
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.toggle = this.toggle.bind(this);
    }


    show() {
      if (!this.isVisible || !this.element.hasClass(this.config.visibleClass)) {
        this.element.addClass(this.config.visibleClass);
        this.isVisible = true;
        const that = this;

        // When someone clicks the [data-close] button then we should close the modal.
        jQuery(document).one('click', '[data-close]', (e) => {
          e.preventDefault();
          that.hide();
        });

        // Close the popup whenever someone clicks outside it.
        jQuery(document).one('click', `:not(${this.config.target})`, (e) => {
          e.preventDefault();
          that.hide();
        });

        return jQuery(document).trigger('concrete:popup:open');
      }
      return jQuery(document).trigger('concrete:popup:error', { error: 'Popup already open' });
    }

    hide() {
      if (this.isVisible || this.element.hasClass(this.config.visibleClass)) {
        this.element.removeClass(this.config.visibleClass);
        this.isVisible = false;
        return jQuery(document).trigger('concrete:popup:close');
      }
      return jQuery(document).trigger('concrete:popup:error', { error: 'Modal is already closed' });
    }

    toggle() {
      return this.isVisible ? this.close() : this.open;
    }

    static jQueryInterface(config) {
      let data = jQuery(this).data(DATA_KEY);
      // We want to grab all the data keys from the modal so we can use data attributes
      // For configuration.
      const popupConfig = jQuery.extend({}, DEFAULT_CONFIG,
                                        jQuery(this).data,
                                        config && typeof config === 'object');
      if (!data) {
        data = new Popup(this, popupConfig);
        jQuery(this).data(DATA_KEY, data);
      }
      if (typeof config === 'string') {
        if (data[config] !== undefined) {
          data[config]();
        }
      } else {
        data.show();
      }
    }
  }

  jQuery(document).ready(() => {
    jQuery(document).on('click', '[data-trigger]', function trigger(e) {
      e.preventDefault();
      const target = Util.getTarget(this, e);
      return Popup.jQueryInterface.call(jQuery(target), { toggle: 'toggle' });
    });
  });

  return Popup;
})();


