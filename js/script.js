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

    $('.collapsible').collapsible();


    var win = $(window);

    $(".welcomeTyper").typed({
        strings: ["Hi. I'm Sriharsha.", "I believe that...", "<span style='font-size: 0.7em;'>\"In order to succeed</span>", "<span style='font-size: 0.7em;'>we must first believe we can.\"</span>", "I am a....",
            "High Schooler", "Web Developer", "Music Lover", "Java Developer", "Singer", "Designer", "Chess Player", "Tech Fanatic", "Cello Player", "And last, but not least....", "<span style='font-size: 0.7em;'>an Award-Winning Hacker</span>"
        ],
        typeSpeed: 0,
        loop: true
    });



});
