var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'));
// parse requests of content-type - application/json
app.use(bodyParser.json());


app.all('/*', (req, res, next) =>{
// CORS headers
res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// Set custom headers for CORS
res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
if(req.metho == 'OPTIONS'){
    res.status(200).end();
} else {
    next();
}
});
// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
// define a simple route
/*app.get('/', function(req, res){
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});*/
app.use('/', require('./routes'));

app.use((req, res, next)=>{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.set('port', process.env.PROT || 3000)
// listen for requests
var server = app.listen(app.get('port'), ()=>{
    console.log("Server is listening on port " + server.address().port);
});