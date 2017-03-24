const Util = require('./Util.js');
const jQuery = require('jquery');

const Popups = (() => {
  jQuery(document).ready(() => {
    jQuery(document).on('click', '[data-open]', function openModal(e) {
      const target = Util.getTarget(this, e);
      if (!jQuery(target).is('.visible')) {
        jQuery(target).addClass('visible');
        jQuery(document).trigger('concrete:modal:show', target);
      }
    });

    jQuery(document).on('click', '[data-close]', function closeModal(e) {
      const target = Util.getTarget(this, e);
      if (jQuery(target).is('.visible')) {
        jQuery(target).removeClass('visible');
        jQuery(document).trigger('concrete:modal:hide', target);
      }
    });

    jQuery(document).on('click', '[data-toggle]', function toggleModal(e) {
      const target = Util.getTarget(this, e);
      jQuery(target).toggleClass('visible');
      if (jQuery(target).is('visible')) {
        jQuery(document).trigger('concrete:modal:show', target);
      } else {
        jQuery(document).trigger('concrete:modal:hide', target);
      }
    });
  });
})();

module.exports = Popups;
