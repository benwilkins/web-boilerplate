'use strict';

define(function() {
  return {
    init: function(url) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = url;
      document.head.appendChild(css);
    }
  };
});
