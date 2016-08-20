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
    database.ref().set({
      numUsers: (snapshot.val() + 1)
    });
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


});
