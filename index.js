const express = require('express'); //nodejs has access to commonjs modules hence 'require' therefore no import express from 'express' which is es2015 modules
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

mongoose.connect(keys.mongoURI);
const app = express(); //one project can have several different express applications. single app is recommended

app.use(bodyParser.json());

//enable cookies inside our application
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey] //randomly picks one cookie from the array of cookies
    })
);
//some const not to be changed lightly hence caps

//to tell passport to make use of cookies for authentication
app.use(passport.initialize()); 
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

//only supposed to be run inside production
if(process.env.NODE_ENV === 'production') {
    //Express will serve up production assets like main.js/main.css file
    app.use(express.static('client/build'));
    //Express will serve up the index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
//whenever heroku runs our app, it has ability to inject env variables in our app
//env variables are set in underlying runtime of node
//heroku passes us the runtime config
//we only know this config after we deploy the app
//we cannot know port until heroku starts the app

//app.listen(5000); //express tells node to listen to port 5000
app.listen(PORT);
