/**
 * Function adds fonts by appending script
 * Function is written using vanilla JS.
 *
 *
 */
function webFontLoader() {
  window.WebFontConfig = {
    google: {
      families: [
        'Roboto+Condensed:400,300,700,300italic,400italic,700italic:latin',
        'Roboto:400,500:latin',
      ],
    },
  };
  var wf = document.createElement('script');
  wf.src = `${
    'https:' === document.location.protocol ? 'https' : 'http'
  }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
}

export default webFontLoader;
