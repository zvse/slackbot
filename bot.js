'use strict';

var Slack = require('slack-node'),
    fs = require('fs'),
    sleep = require('sleep'),

    apiToken = "xoxp-7813169409-8549932064-20996960166-028257259d",
    slack = new Slack(apiToken),

    date = new Date(),
    hours = '',
    minutes = '',
    member = '',
    message = '',

    randomNumber = Math.floor(Math.random() * 3),

    currentDay = date.getDay(),
    data = fs.readFileSync("members.json"),
    data = JSON.parse(data),
    members = data[currentDay - 1].members,

    steps = fs.readFileSync("steps.json"),
    steps = JSON.parse(steps),

    the_interval = 60 *1000,
    pingCount = 0,
    membersToday = '';

var ping = setInterval(function () {
    date = new Date();
    currentDay = date.getDay();
    hours = date.getHours();
    minutes = date.getMinutes();
    console.log("Часы: " + hours + " Минуты: " + minutes);
    if (hours == 10 && minutes == 0) {
        if (!steps.step_1.checked) {
            message = steps.step_1.messages[randomNumber];
            console.log(message);
            slack.api('chat.postMessage', {
                text: message,
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_1.checked = true;
        }
    }
    if (hours == 10 && minutes == 1) {
        if (!steps.step_2.checked) {
            for (var i = 0; i < members.length; i++) {
                member = members[i];
                if (member.id) {
                    membersToday += "<@" + member.id + "> ";
                    message = "<@" + member.id + "> " + member.ability;
                    console.log(message);
                    slack.api('chat.postMessage', {
                        text: message,
                        channel: '#slackbot_daemon'
                    }, function (err, response) {
                        console.log(response);
                    });
                }
            }
            steps.step_2.checked = true;
        }
    }
    if (hours == 13 && minutes == 10) {
        if (!steps.step_3.checked) {
            slack.api('chat.postMessage', {
                text: membersToday + steps.step_3.messages[randomNumber],
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_3.checked = true;
        }
    }
    if (hours == 16 && minutes == 10) {
        if (!steps.step_4.checked) {
            slack.api('chat.postMessage', {
                text: membersToday + steps.step_4.messages[randomNumber],
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_4.checked = true;
        }
    }
    if (hours == 18 && minutes == 10) {
        if (!steps.step_5.checked) {
            slack.api('chat.postMessage', {
                text: membersToday + steps.step_5.messages[randomNumber],
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_5.checked = true;
        }
    }
    if (hours == 18 && minutes == 40) {
        if (!steps.step_6.checked) {
            slack.api('chat.postMessage', {
                text: membersToday + steps.step_6.messages[randomNumber],
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_6.checked = true;
        }
    }
    // Use this function for stoping script.
    //    clearInterval(ping);
}, the_interval);
