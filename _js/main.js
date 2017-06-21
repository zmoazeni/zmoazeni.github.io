'use strict';

window.$ = window.jQuery = require('jquery');
require('../node_modules/foundation-sites/dist/js/foundation');

// setup Google Tracking
// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-1484071-4']);
// _gaq.push(['_trackPageview']);

// var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
// ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
// var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

$(function() {
  $(document).foundation();
});
