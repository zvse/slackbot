'use strict';

// Define variables
// define modules
var Slack = require('slack-node'),
    fs = require('fs'),
    // time variables
    date = new Date(),
    hours,
    minutes,
    currentDay,
    // Config variables
    config,
    slack,
    randomNumber,
    // Define variables are related to people
    member,
    members,
    membersToday,
    message,
    // Define other variables
    steps,
    currentStep,
    the_interval;

// Get config
config = fs.readFileSync("config.json");
config = JSON.parse(config);

// Get all members. 
currentDay = date.getDay();
members = fs.readFileSync("members.json");
members = JSON.parse(members);
members = members[currentDay - 1].members;

// Get steps.
steps = fs.readFileSync("steps.json");
steps = JSON.parse(steps);

// Every 1 minute
the_interval = 60 * 1000;
currentStep = 0;
membersToday = '';

// Define slack object with config.
slack = new Slack(config.token);

// Define interval and run script by interval.
var ping = setInterval(function () {
    date = new Date();
    currentDay = date.getDay();
    hours = date.getHours();
    minutes = date.getMinutes();
    randomNumber = Math.floor(Math.random() * 3);
    console.log("Time: " + hours + ":" + minutes);
    console.log("Current step: " + currentStep);
    // If current time is coming...
    if (hours == steps[currentStep].hours && minutes == steps[currentStep].minutes) {
        // Should we skip this step.
        if (!steps[currentStep].skip) {
            // If this step is initial, then send message to all people.
            if (steps[currentStep].initial) {
                for (var i = 0; i < members.length; i++) {
                    member = members[i];
                    if (member.id) {
                        membersToday += "<@" + member.id + "> ";
                        message = "<@" + member.id + "> " + member.ability;
                        console.log(message);
                        slack.api('chat.postMessage', {
                            text: message,
                            channel: config.channel,
                            as_user: true
                        }, function (err, response) {
                            console.log(response);
                        });
                    }
                }
            }
            // Send ping-message about today's activity.
            else {
                message = steps[currentStep].messages[randomNumber];
                console.log(message);
                slack.api('chat.postMessage', {
                    text: message,
                    channel: config.channel,
                    as_user: true
                }, function (err, response) {
                    console.log(response);
                });

            }
            steps[currentStep].skip = true;
            currentStep++;
        }
    }
    // Use this function for stoping script.
    if (currentStep == steps.length) {
       clearInterval(ping);
    }
}, the_interval);
