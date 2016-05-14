'use strict';

define(function(require) {
  var $ = require('jquery');

  var Hero = (function() {
    $('.Hero').append(' has loaded');
  })();

  return Hero;
});
