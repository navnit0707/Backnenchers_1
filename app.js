var express = require('express');
var app = express();

var listen = app.listen(3005,
    () => console.log('server started on port 3005')
);