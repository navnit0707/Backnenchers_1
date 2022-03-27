var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var express = require('express');
var app = express();

var url = "mongodb://localhost:27017/hackathon";

var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });

app.use(bodyParser.json({
    limit: '1000mb'
}));

app.use(bodyParser.urlencoded({
    limit: '1000mb',
    parameterLimit: 1000000000,
    extended: true
}));

app.use(jsonParser);

var route = require('./api/authentication')

app.get('/login', jsonParser, function(req, res) {

    let response = route.login(req, res, function(err, body) {
        if (err)
            res.send(err);
        res.send(body);
    });
});

app.post('/signup', jsonParser, function(req, res) {
    let response = route.signup(req, res, function(err, body) {
        if (err)
            res.send(err);
        res.send(body);
    });

});

var listen = app.listen(3005,
    () => console.log('server started on port 3005')
);