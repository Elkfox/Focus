const Util = require('./Util.js');
const jQuery = require('jquery');

const Popups = (() => {
  const DEFAULT_CONFIG = {
    visibleClass: 'visible',
  }; // We don't actually have a real config yet.

  const DATA_KEY = 'concrete.popup';

  class Popup {
    constructor(target, config = {}) {
      this.target = target;
      this.element = jQuery(this.target);
      console.log(this.target, this.element);
      this.config = Object.assign({}, DEFAULT_CONFIG, config);
      this.isVisible = false;
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.toggle = this.toggle.bind(this);
    }


    show() {
      console.log('Showing!');
      if (!this.isVisible) {
        console.log(this.element);
        this.element.addClass(this.config.visibleClass);
        this.isVisible = true;
        const that = this;
        jQuery(document).one('click', '[data-close]', (e) => {
          e.preventDefault();
          that.hide();
        });
        return jQuery(document).trigger('concrete:popup:open');
      }
      return jQuery(document).trigger('concrete:popup:error', { error: 'Popup already open' });
    }

    hide() {
      if (this.isVisible) {
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
      // We don't want to worry about config at the moment.
      const popupConfig = jQuery.extend({}, DEFAULT_CONFIG, config);
      console.log(data);
      if (!data) {
        data = new Popup(this, popupConfig);
        jQuery(this).data(DATA_KEY, data);
        console.log(data);
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
      const target = Util.getTarget(this, e);
      return Popup.jQueryInterface.call(jQuery(target), { toggle: 'toggle' });
    });
  });

  return Popup;
})();

module.exports = Popups;
