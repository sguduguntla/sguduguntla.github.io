<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>Sai Birthday Countdown</title>
  <!-- Bootstrap -->
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  <!--JQuery-->
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Josefin+Slab:400,100,100italic,300,400italic,600,600italic,700,700italic,300italic' rel='stylesheet' type='text/css'>
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
          <![endif]-->
  <style type="text/css">
    html,
    body {
      max-width: 100%;
      overflow-x: hidden;
      background-image: url("countdown-bg.jpg");
    }

    @-webkit-keyframes mymove {
      from {
        left: -1000px;
        color: red;
      }
      to {
        left: 440px;
        color: blue;
      }
    }

    @-webkit-keyframes colorchanger {
      from {
        color: blue;
      }
      to {
        color: red;
      }
    }

    #title {
      position: relative;
      margin-top: 100px;
      left: -1000px;
      font-weight: bold;
      font-size: 3em;
      color: red;
      -webkit-animation: mymove 3s;
      /* Chrome, Safari, Opera */
      animation: mymove 3s;
      -webkit-animation-fill-mode: forwards;
      font-family: 'Josefin Slab', serif;
    }

    #countdown {
      color: black;
      width: 700px;
      height: 200px;
      margin: 0 auto;
      text-align: center;
      vertical-align: middle;
      line-height: 70px;
      font-size: 4em;
      font-family: 'Josefin Slab', serif;
      display: none;
    }

    #target {
      color: black;
      width: 700px;
      height: 200px;
      position: relative;
      margin: 0 auto;
      top: 60px;
      text-align: center;
      font-size: 4em;
      font-family: 'Josefin Slab', serif;
      display: none;
    }

    p {
      color: black;
      font-family: 'Josefin Slab', serif;
      text-align: center;
      position: relative;
      bottom: 0;
      display: none;
    }

  </style>
</head>

<body>
  <h1 id="title">Sai Birthday Countdown</h1>
  <div id="countdown"></div>
  <div id="target">...until June 11, 2016</div>
  <p class="lead">© Sriharsha Guduguntla 2015 - 2016</p>

  <script type="text/javascript">
    $(window).load(function() {
      $("#countdown").fadeIn(5000);
      $("#target").delay(3000).fadeIn(3000);
      $("p").delay(4000).fadeIn(3000);

      var targetDate = new Date("June 11, 2016").getTime();
      var weeks, days, hours, minutes, seconds;

      var counterInterval = setInterval(function() {
        var secPerWeek = 604800;
        var daysPerWeek = 7;
        var secPerHour = 3600;
        var secPerMin = 60;
        var milliPerSec = 1000;
        var currentDate = new Date().getTime();
        var secondsLeft = (targetDate - currentDate) / milliPerSec; //Amount of seconds left between now and birthday
        weeks = parseInt(secondsLeft / secPerWeek);
        secondsLeft = secondsLeft % secPerWeek;

        days = weeks % daysPerWeek;

        hours = parseInt(secondsLeft / secPerHour);
        secondsLeft = secondsLeft % secPerHour;

        while (hours >= 24) {
          days++;
          hours -= 24;
        }

        minutes = parseInt(secondsLeft / secPerMin);
        seconds = parseInt(secondsLeft % secPerMin);

        var weekStr = " weeks, ";
        var daysStr = " days, ";
        var hoursStr = " hours, ";
        var minutesStr = " minutes, ";
        var secondsStr = " seconds";

        if (weeks == 1) {
          weekStr = " week, ";
        }

        if (days == 1) {
          daysStr = " day, ";
        }

        if (hours == 1) {
          hoursStr = " hour, ";
        }

        if (minutes == 1) {
          minutesStr = " minute, ";
        }

        if (seconds == 1) {
          secondsStr = " second";
        }

        $("#countdown").html(weeks + weekStr + days + daysStr + hours + hoursStr + minutes + minutesStr + seconds + secondsStr + ".");

        if (weeks == 0 && days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
          clearInterval(counterInterval);
          //document.write("<?php /*mail("sreeharsha11@gmail.com", "It's your birthday today!", "SRIHARSHA GUDUGUNTLA! HAPPY BIRTHDAY! I'VE BEEN COUNTING FOR A LONG TIME.....");*/ ?>");
          $("#countdown").html("HAPPY BIRTHDAY SAI!!!");
          $("#target").html("<img src='mypic.jpg' width='500px' height='700px'/>");
          $("p").css("top", "650px");
        }

      }, 1000);
    });

  </script>


</body>

</html>
