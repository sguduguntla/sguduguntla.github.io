var suggestionsJS = function() {
    var ref = new Firebase("https://finance-tracker.firebaseio.com/");

    $("#begin").on('click', function(e) {
        e.preventDefault();

        $("#explanation").fadeOut();

        $("#companyList").fadeIn();

        responsiveVoice.speak("Here are the list of companies that I have gathered. Please take a moment to look through them.");

        //populateCompanyTable();

    });

    function populateCompanyTable() {
       // analyzeData();
    }

    function analyzeData() {
        var max = 0;
        var min = 0;
        var average = 0;
        var mode;
        var allInitPrices = [];

        ref.child("myinvestments").once("value", function(snapshot) {
            var snap = snapshot.val();

            var numInvestments = Object.keys(snap).length;

            totalInitPrices = 0;

            var i = 0;

            while (i < numInvestments) {
                var tickerName = Object.keys(snap)[i];

                var initPrice = parseFloat(snap[tickerName].originalPrice);

                allInitPrices.push(initPrice);

                totalInitPrices += initPrice;

                i++;
            }

            allInitPrices.sort();

            max = allInitPrices[allInitPrices.length - 1];
            min = allInitPrices[0];
            average = totalInitPrices / (allInitPrices.length);

            mode = function mode(arr) {
                var numMapping = {};
                var greatestFreq = 0;
                var mode;
                arr.forEach(function findMode(number) {
                    numMapping[number] = (numMapping[number] || 0) + 1;

                    if (greatestFreq < numMapping[number]) {
                        greatestFreq = numMapping[number];
                        mode = number;
                    }
                });
                return +mode;
            }

            var mode = mode(allInitPrices);

            console.log("Mode: " + mode);

        });

        ref.child("companies").once("value", function(snapshot) {
            var snap = snapshot.val();

            var numCompanies = Object.keys(snap).length;

            var inGoodRange = ["OMG"];

            var i = 0;

            for (var key in snap) {

                var tickerName = snap[key];

                doAlgorithm(i, tickerName, max, min, average, inGoodRange, allInitPrices);

                console.log(inGoodRange);

                i++;

            }

            //console.log(inGoodRange);

            /*  var finalCompanies = [];

              inGoodRange.forEach(function(val) {
              	var symbol = val.Symbol;

              	getDetailedStockReport(symbol, function(results) {
              		finalCompanies.push(results);
              	});
              });

              console.log("Final Companies: " + finalCompanies.length);*/


        });
    }

    function doAlgorithm(i, tickerName, max, min, average, inGoodRange, allInitPrices) {
    	//console.log(inGoodRange);

        getCurrentStockPrice(tickerName, function(results) {
            try {

              //  console.log("My name is I: " + i);

                var curStockPrice = parseFloat(results.Close);

                if (curStockPrice <= max && curStockPrice >= min) {
                    if ((parseFloat(results.High) - curStockPrice) < 0) {

                        // if (curStockPrice => average - 10 || curStockPrice <= average + 10) {
                        inGoodRange.push(results);
                        //}

                    } else if (results.High - results.Low > 0) {
                        if (curStockPrice => average - 10 || curStockPrice <= average + 10) {
                            inGoodRange.push(results);
                        }
                    }
                }

                return inGoodRange;


            } catch (err) {
                console.log(i);
            }

        });


    }

    function setupTable(inGoodRange) {
        alert("Hi");
        console.log("I'm here: " + inGoodRange);
        var str = '<tr style="height: 100px !important;" class="animated fadeIn">';
        str += '<td>' + tickerName + '</td>';
        str += '<td>$' + parseFloat(curStockPrice).toFixed(2) + '</td>';
        str += '<td>' + companyShares + '</td>';
        str += '<td>$' + parseFloat(totalInvest).toFixed(2) + '</td>';
        str += '<td>$' + profit.toFixed(2) + '</td>';
        str += '<td><button style="color: black" class="btn waves-effect deleteInvestment waves-dark white"><i class="fa fa-trash"></i></button></td>';
        str += '</tr>';
    }

    function getCurrentStockPrice(ticker, callback) {

        var dateToday = getDateToday().substring(0, getDateToday().length);
        var dateYesterday = getDateYesterday().substring(0, getDateYesterday().length);;

        var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22" + encodeURIComponent(ticker) + "%22%20and%20startDate%20%3D%20%22" + encodeURIComponent(dateYesterday) + "%22%20and%20endDate%20%3D%20%22" + encodeURIComponent(dateToday) + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

        //console.log(yql);

        $.ajax({
            url: yql,
            success: function(result) {
                if (result.query.results != null && result.query.results.quote != null) {
                    callback(result.query.results.quote);
                } else {
                    //console.log(result);
                }
            }
        });

    }

    function getDetailedStockReport(ticker, callback) {
        var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22" + encodeURIComponent(ticker) + "%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

        $.ajax({
            url: yql,
            success: function(result) {
                if (result.query.results != null && result.query.results.quote != null) {
                    callback(result.query.results.quote);
                } else {
                    console.log(result);
                }
            }
        });

    }

    function getDateToday() {

        var d = new Date();

        var month = (d.getMonth() + 1).toString();

        if (month.length < 2) {
            month = "0" + month;
        }

        var today = d.getFullYear().toString() + "-" + month + "-" + (d.getDate() - 1);

        return today;
    }

    function getDateYesterday() {

        var d = new Date();

        var month = (d.getMonth() + 1).toString();

        if (month.length < 2) {
            month = "0" + month;
        }

        var today = d.getFullYear().toString() + "-" + month + "-" + (d.getDate() - 2);

        return today;
    }
}