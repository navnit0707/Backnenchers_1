var express = require('express');
var app = express();
var EventEmitter = require('events').EventEmitter;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var MongoClient = require('mongodb').MongoClient

var url = "mongodb://localhost:27017/hackathon";


var loginmodule = {

    login: function(req, res, next) {

        var emailid = req.query.emailid;
        var password = req.query.password;

        MongoClient.connect(url, function(err, client) {
            if (err) throw err;
            const db = client.db("hackathon");
            console.log('CONNECTED');

            db.collection('login').find({ emailid: emailid, password: password }).toArray(function(err, result) {
                console.log("Lengthof result" + result.length);
                if (result.length > 0) {

                    var json = {
                        "isSuccess": true,
                        "message": "Logged in successfully",
                        "result": result[0]
                    }

                    res.send(json);
                } else {
                    var json = {
                        "isSuccess": false,
                        "message": "Incorrect emailid/Password"
                    }

                    res.send(json);
                }
            });

        });
    },
    signup: function(req, res, next) {
        MongoClient.connect(url, function(err, client) {
            if (err) throw err;
            const db = client.db("hackathon");
            console.log('CONNECTED');

            db.collection('login').find({ emailid: emailid, password: password }).toArray(function(err, result) {
                console.log("Lengthof result" + result.length);
                if (result.length > 0) {

                    var json = {
                        "isSuccess": true,
                        "message": "Logged in successfully",
                        "result": result[0]
                    }

                    res.send(json);
                } else {
                    console.log("Signup ")
                    res.send(json);
                }
            });
        });
    }
}
module.exports = loginmodule;