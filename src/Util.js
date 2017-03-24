/* eslint class-methods-use-this: 0 */
const jQuery = require('jquery');

const Util = {
  getSelectorFromElement: (element) => {
    console.log(element);
    let selector = jQuery(element).data('target');
    console.log(selector);
    if (!selector || selector === '#') {
      selector = jQuery(element).attr('href') || '';
    }

    try {
      const $target = jQuery(selector);
      return $target.length > 0 ? selector : null;
    } catch (error) {
      return null;
    }
  },

  getTarget: (element, e) => {
    let target = null;
    if (jQuery(this).is('a')) {
      e.preventDefault();
    }
    const selector = this.getSelectorFromElement(element);
    if (selector) {
      target = jQuery(selector)[0];
    }
    return target;
  },
};

module.exports = Util;
