'use strict';

var Slack = require('slack-node');
var fs = require('fs');
var sleep = require('sleep');
var date = new Date();
var currentDay = date.getDay();
var member = '';
var message = '';
var apiToken = "xoxp-7813169409-8549932064-20996960166-028257259d";
var slack = new Slack(apiToken);

var contents = fs.readFileSync("employers.json");
var data = JSON.parse(contents);
var members = data[currentDay - 1].members;

//@Todo check current day, read last message and ping members, who doesn't answered.
var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
	for (var i = 0; i < members.length; i++) {
		member = members[i];
		message = "<@" + member.id + "> " + member.ability;
		console.log(message);
		slack.api('chat.postMessage', {
		  text: message,
		  channel:'#slackbot_daemon'
		}, function(err, response){
		  console.log(response);
		});
	}
}, the_interval);
