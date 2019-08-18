
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

var url = 'api.mailgun.net/v3';
var domain = 'mg.saidomain.com';
var key = 'key-46e9c43adeb631ebddae90998a64126c';

var client = require('mailgun');
client.initialize(domain, key);

Parse.Cloud.define("sendEmailToUser", function(request, response) {
 
                  client.sendEmail({
                    to: request.params.email,
                    from: request.params.from,
                    subject: request.params.subject,
                    text: request.params.body
                  }).then(function(httpResponse) {
                    response.success("Email sent to you!");
                    alert("Email sent to you! " + request.params.email);
                  }, function(httpResponse) {
                    console.error(httpResponse);
                    response.error("Uh oh, something went wrong");
                  });

});
