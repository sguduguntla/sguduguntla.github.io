/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var Vibe = require('ui/vibe');
var UI = require('ui');
var Vector2 = require('vector2');
var date = new Date();


var moment = require('moment');

//var stopwatch = require('stopwatch');

var Parse = require('parse');

var jQuery = require('jquery');
var timeString = "";
var numPushUps = 0;
var numSitUps = 0;
var numPacers = 0;
var token = Pebble.getAccountToken();
console.log(token);

/*var password="";
var username="";


var newUser = "";
var newPass = "";*/

Parse.$ = jQuery;
Parse.initialize("74r51EZApPpxAoBhl2wV2jEbizWsEm7b0SP7YawZ", "OlV6vgDlTLZB546RuxsQyqOkNpuEK7rVE1GxSmAO");


/*Parse.User.logIn(username, newPass, {
 success: function(user) {
     console.log("Yes");
   },
  error: function(user, error) {
      console.log("Error: " + error.code + " " + error.message);
   }
});*/


var window = new UI.Window();
var Vector2 = require('vector2');
var initTime = 0;
var endTime = 0;
var finalTime = 0;

var endNotPressed = true;

var logo = new UI.Image({
    image: 'images/logo.png'
});
    
var runner = new UI.Image({
    image: 'images/rsz_runner.png'
}); 

var key = new UI.Card({
    subtitle : 'Enter this key on the website: ' + token + '. ',
    body: '                           Press the SELECT key to proceed',
    scrollable : true
});


// Make a list of menu items
var activities = [
  {
    title: "Mile Run",
    subtitle: "Run! Run! Run!"
  },
  {
    title: "Push-ups",
    subtitle: "Pects of glory!"
  },
  {
    title: "Curl-ups",
    subtitle: "Abs of steel!"
  },
  {
    title: "Pacer",
    subtitle: "Back and forth!"
  }
];



// Create the Menu, supplying the list of activities
var activityMenu = new UI.Menu({
  sections: [{
    title: 'Activity List',
    items: activities
  }]
});



window.add(logo);
window.show();
//setTimeout(function(){ activityMenu.show();}, 3000);
//enterPage.add(rect);
//enterPage.add(dispToken);//disp


setTimeout(function(){ key.show();}, 3000);


key.on('click', 'select', function(event) {
  activityMenu.show();
});

var view_run = new UI.Window();

    


// Add a click listener for select button click
activityMenu.on('select', function(event) {
    
    var thing = event.itemIndex;
    //console.log(thing);
     // Show a card with clicked item details
    
    if(thing === 0) {//IF MILE RUN IS SELECTED
        var mileCard = new UI.Card({
            body: "Press the SELECT button to start your run!"
        });
        
        
        
      // Show the new Card
          mileCard.show();
          mileCard.on('click', function(event) {//RUNNING MODE
              initTime = (new Date()).getTime();
              console.log(initTime);
              //console.log(initTime);
              Vibe.vibrate('short');
              view_run.add(runner);
              view_run.show();
              view_run.on('click', function(event) {//If the user stops the run
                  endTime = (new Date()).getTime();
                  console.log(endTime);
                  finalTime = (endTime-initTime);
                  console.log(finalTime);
                  timeString = msToHMS(finalTime);// push to parse
                  console.log(timeString);
                  var mileTime = timeString;
                  mileTime = mileTime.replace(":",".");
                  //var ans = stopwatch.time();
                  //ans /= 1000;
                  //stopwatch.stop();
                  //console.log("Final Time: " + ans.toHHMMSS);
                  var mileTimeShow = new UI.Card({
                        subtitle: 'Your mile time was: ' + timeString
                  });
                  mileTimeShow.show();
                  
                  var q1 = new Parse.Query(Parse.User);

                    q1.find({
                        success: function(items) {
                            items.forEach(function(item, i) {
                                var pebbleToken = item.get("pebbleToken");
                                if (pebbleToken === token) {
                                    item.set("numMileRuns", item.get("numMileRuns") + 1);
                                    item.set("mileRun", item.get("mileRun") + (item.get("numMileRuns") + ":" + mileTime + ","));
                                    item.save();
                                }
                            });
                        }
                    });
                 
                  setTimeout(function(){ activityMenu.show();}, 10000); //back to list
              });
              
          });
        
          
    }else if(thing === 1) {
        var showPushUpMenu = new UI.Card({
            title : 'Push-Ups',
            subtitle : 'How many push-ups did you do today?',
            body : numPushUps
        });
        showPushUpMenu.show();
        
        showPushUpMenu.on('click', 'up', function(event) {
            numPushUps++;
            showPushUpMenu.body(numPushUps);
        });
        showPushUpMenu.on('click', 'down', function(event) {
            if(numPushUps > 0) 
                numPushUps--;
            showPushUpMenu.body(numPushUps);
            
        });
        showPushUpMenu.on('click', 'select', function(event) {
             var q1 = new Parse.Query(Parse.User);

                    q1.find({
                        success: function(items) {
                            items.forEach(function(item, i) {
                                var pebbleToken = item.get("pebbleToken");
                                console.log(pebbleToken + " vs " + token);
                                if (pebbleToken === token) {
                                    item.set("numPushups", item.get("numPushups") + 1);
                                    item.set("pushups", item.get("pushups") + (item.get("numPushups") + ":" + numPushUps + ","));
                                    item.save();
                                }
                            });
                        }
                    });
            activityMenu.show();
        });
        
    }else if(thing === 2) {
        var showCurlUpMenu = new UI.Card({
            title : 'Sit-Ups',
            subtitle : 'How many sit-ups did you do today?',
            body : numSitUps
        });
        showCurlUpMenu.show();
        
        showCurlUpMenu.on('click', 'up', function(event) {
            numSitUps++;
            showCurlUpMenu.body(numSitUps);
        });
        showCurlUpMenu.on('click', 'down', function(event) {
            if(numSitUps > 0) 
                numSitUps--;
            showCurlUpMenu.body(numSitUps);
            
        });
        showCurlUpMenu.on('click', 'select', function(event) {
             var q1 = new Parse.Query(Parse.User);

                    q1.find({
                        success: function(items) {
                            items.forEach(function(item, i) {
                                var pebbleToken = item.get("pebbleToken");
                                if (pebbleToken === token) {
                                    item.set("numCurlups", item.get("numCurlups") + 1);
                                    item.set("curlups", item.get("curlups") + (item.get("numCurlups") + ":" + numSitUps + ","));
                                    item.save();
                                }
                            });
                        }
                    });
            
            activityMenu.show();
        });
    }else{
        var showPacerMenu = new UI.Card({
            title : 'PACER',
            subtitle : 'How many PACERs did you do today?',
            body : numPacers
        });
        showPacerMenu.show();
        
        showPacerMenu.on('click', 'up', function(event) {
            numPacers++;
            showPacerMenu.body(numPacers);
        });
        showPacerMenu.on('click', 'down', function(event) {
            if(numPacers > 0) 
                numPacers--;
            showPacerMenu.body(numPacers);
            
        });
        showPacerMenu.on('click', 'select', function(event) {
             var q1 = new Parse.Query(Parse.User);

                    q1.find({
                        success: function(items) {
                           items.forEach(function(item, i) {
                                var pebbleToken = item.get("pebbleToken");
                                if (pebbleToken === token) {
                                    item.set("numPacers", item.get("numPacers") + 1);
                                    item.set("pacers", item.get("pacers") + (item.get("numPacers") + ":" + numPacers + ","));
                                    item.save();
                                }
                            });
                        }
                    });
            activityMenu.show();
        });
    }
});



function msToHMS( ms ) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    var comb = "";
    
    // 2- Extract hours:
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    if(seconds < 10) {
        comb = 0 + ""+seconds;
        seconds = parseInt(comb);
        console.log("yo"+seconds);
    }
    if (seconds < 10) {
        return((minutes)+":0"+(seconds));
    } else {
        return((minutes)+":"+(seconds));
    }
}











  



