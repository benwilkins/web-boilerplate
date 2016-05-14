'use strict';

require.config({
  paths: {
    jquery: [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
      '../../vendor/jquery/dist/jquery.min'
    ],
    lodash: '../../vendor/lodash/lodash',
    vendor: '../../vendor',
    components: 'components',
    utils: 'utils'
  }
});

var components = document.querySelectorAll('[data-component]');

require(Array.prototype.map.call(components, function(el)
{
  return el.dataset !== undefined ?
    'components/' + el.dataset.component :
    'components/' + el.getAttribute('data-component');
}));
