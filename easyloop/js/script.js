$(function() {

  new WOW().init();

  $('.flexslider').flexslider({
    animation: "slide"
  });

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  window.fbAsyncInit = function() {
    FB.init({
      appId: '1155738174469383',
      xfbml: true,
      version: 'v2.7'
    });
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7GK5mrHwbvVWa90RSORQlyALWGrEB4Js",
    authDomain: "easy-loop.firebaseapp.com",
    databaseURL: "https://easy-loop.firebaseio.com",
    storageBucket: "easy-loop.appspot.com",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  var userCountRef = database.ref('numUsers');

  userCountRef.once('value').then(function(snapshot) {
    $("#numViews").html(snapshot.val() + 1);
    database.ref('numUsers').set(snapshot.val() + 1);
  });

  $(".downloadBtn").click(function(e) {
    var downloadCountRef = database.ref('downloadClicked');

    downloadCountRef.once('value').then(function(snapshot) {
      database.ref("downloadClicked").set(snapshot.val() + 1);
    });
  });

  //Google Analytics
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-72808221-2', 'auto');
  ga('send', 'pageview');


});
