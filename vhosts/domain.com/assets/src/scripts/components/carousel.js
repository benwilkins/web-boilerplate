'use strict';

define(function(require) {
  var Swiper = require('vendor/swiper/dist/js/swiper');
  var cssLoader = require('utils/cssLoader');

  cssLoader.init('assets/vendor/swiper/dist/css/swiper.min.css');

  // let Carousel = () =>
  //   var options = {
  //     onInit(swiper) =>
  //       swiper.container[0].classList.add('loaded')
  //   }

  //   new Swiper('.Carousel', options)

  var Carousel = (function() {
    var options = {
      onInit: function(swiper) {
        swiper.container[0].classList.add('loaded');
      }
    };

    new Swiper('.Carousel', options);
  })();

  return Carousel;
});
