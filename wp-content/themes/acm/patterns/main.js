import links from './scripts/links';
import navigation from './scripts/navigation';
import ready from './scripts/ready';
import webFontLoader from './scripts/webFontLoader';
import makeAllElementsVisible from './scripts/padding';
import 'classlist.js';

/**
 * Function that is fired once the page is Reaady to fire any JS, add anything
 * required to be executed after the page is ready.
 */
function onReady() {
  links();
  navigation();
  webFontLoader();
  makeAllElementsVisible();
}

// The callback is fired when the dom is ready.
ready(onReady);
