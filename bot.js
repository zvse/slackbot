'use strict';

var Slack = require('slack-node'),
    fs = require('fs'),
    sleep = require('sleep'),
    date = new Date(),
    currentDay = date.getDay(),
    hours = '',
    minutes = '',
    member = '',
    message = '',
    apiToken = "xoxp-7813169409-8549932064-20996960166-028257259d",
    slack = new Slack(apiToken);

var contents = fs.readFileSync("members.json");
var data = JSON.parse(contents);
var members = data[currentDay - 1].members;

// Get info about all users.
//slack.api("users.list", function(err, response) {
//  console.log(response);
//});

//console.log(members);
var steps = {
    "step_1" : false,
    "step_2" : false,
    "step_3" : false,
    "step_4" : false,
    "step_5" : false,
    "step_6" : false
};
var the_interval = 60 *1000;
var pingCount = 0;
var ping = setInterval(function () {
    hours = date.getHours();
    minutes = date.getMinutes();
    console.log("Часы: " + hours);
    console.log("Минуты: " + minutes);
    if (hours == 10 && minutes == 40) {
        if (!steps.step_1) {
            message = "Доброе утро!";
            console.log(message);
            slack.api('chat.postMessage', {
                text: message,
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_1 = true;
        }
    }
    if (hours == 10 && minutes == 41) {
        if (!steps.step_2) {
            for (var i = 0; i < members.length; i++) {
                member = members[i];
                message = "<@" + member.id + "> " + member.ability;
                console.log(message);
                slack.api('chat.postMessage', {
                    text: message,
                    channel: '#slackbot_daemon'
                }, function (err, response) {
                    console.log(response);
                });
            }
            steps.step_2 = true;
        }
    }
    if (hours == 13 && minutes == 10) {
        if (!steps.step_3) {
            slack.api('chat.postMessage', {
                text: 'Как идет дежурство? Какой статус?',
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_3 = true;
        }
    }
    if (hours == 16 && minutes == 10) {
        if (!steps.step_4) {
            slack.api('chat.postMessage', {
                text: 'Ребята все хорошо? Что еще осталось?',
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_4 = true;
        }
    }
    if (hours == 18 && minutes == 10) {
        if (!steps.step_5) {
            slack.api('chat.postMessage', {
                text: 'Конец дня! Все готово для сдачи дежурства?',
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_5 = true;
        }
    }
    if (hours == 18 && minutes == 10) {
        if (!steps.step_6) {
            slack.api('chat.postMessage', {
                text: 'Спасибо всем за Вашу работу! Вы самые лучшие!',
                channel: '#slackbot_daemon'
            }, function (err, response) {
                console.log(response);
            });
            steps.step_6 = true;
        }
    }
    //if (pingCount == 5) {
    //    clearInterval(ping);
    //}
    pingCount++;
    // do your stuff here
}, the_interval);
