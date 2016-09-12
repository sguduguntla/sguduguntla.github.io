$(document).ready(function() {

  //Mobile "Add to Homescreen" alert activated
  addToHomescreen({
    skipFirstVisit: true,
    maxDisplayCount: 1
  });

  /*************************/

  //Tooltips are activated
  $('.tooltipped').tooltip({
    delay: 50
  });

  /*************************/

  //Side-nav comes out from the right
  $(".button-collapse").sideNav({
    edge: 'right'
  });

  var win = $(window);

  $(".welcomeTyper").typed({
    strings: ["Hi. I'm Sriharsha.", "I truly believe that...", "<span style='font-size: 0.7em;'>\"In order to succeed, we must first believe we can.\" - Nikos Kazantzakis</span>", "I am a....",
      "High Schooler", "Web Developer", "Music Lover", "Java Developer", "Singer", "Designer", "Chess Player", "Tech Fanatic", "Cello Player", "And last, but not least....", "an Award-Winning Hacker"
    ],
    typeSpeed: 0,
    loop: true
  });

});
