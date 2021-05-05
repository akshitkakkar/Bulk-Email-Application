const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url'); //default module in nodejs, helps parse url
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const { request } = require('express');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({
            _user: req.user.id
        }) //Survey.find({}) returns a Queryobject from mongoose
        .select({recipients: false}); //according to projections we have to write it as Query#select
                  //to exclude field in select we use - in string or use 0,1/true,false in object
        res.send(surveys);
    });
    
    app.post('/api/surveys/webhook', (req, res) => {
        // const events = _.map(req.body, ({email, url}) => {
        //     const pathname = new URL(url).pathname;
        //     const parserObj = new Path('/api/surveys/:surveyId/:choice');
        //     const match = parserObj.test(pathname)
        //     if(match) {
        //         return {email, surveyId: match.surveyId, choice: match.choice}; //{email: event.email, surveyId: match.surveyId, choice: match.choice}
        //     }
        // })

        // const compactEvents = _.compact(events) //removes undefined
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId') //removes duplicates

        // console.log(uniqueEvents);

        // res.send({})
        const parserObj = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body) //code refactoring using chain helper
            .map(({email, url}) => {
                const match = parserObj.test(new URL(url).pathname)
                if(match) {
                    return {email, surveyId: match.surveyId, choice: match.choice}; //{email: event.email, surveyId: match.surveyId, choice: match.choice}
                }
            })
            .compact() //removes undefined
            .uniqBy('email', 'surveyId') //removes duplicates
            .each(({surveyId, email, choice}) => { //mongo query
                Survey.updateOne({ //finds and updates record with given search criteria
                    _id: surveyId, //mongoose is okay with id but mongo expects _id
                    recipients: {
                        $elemMatch: {email: email, responded: false} 
                    }
                }, { //update found record as second parameter
                    $inc: {[choice]: 1}, 
                    $set: {'recipients.$.responded': true},
                    lastResponded: new Date()
                }).exec(); //query explained mongoQueryExplained.js
            })             //exec executes the query
            //query is async but we do not use await because we do not have to respond to sendgrid with any specific data since all the necessary data is already here
            .value();

        // console.log(events);

        res.send({})
    })

    app.get('/api/surveys/:surveyId/:choice', (req, res) => { //express matches these wildcards (pathnames with :) with incoming requests
        res.send('Thanks for voting!');
    })

    //middleware should be added in order we want them to be executed
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients} = req.body; //destructuring
        const survey = new Survey({ //creates instance in memory, need to be persisted to DB
            title, //destructuring title: title
            subject,
            body,
            recipients: recipients.split(',').map(email=> { return {email: email.trim()}}), // destructured as .map(email=> ({ email }))
            _user: req.user.id,
            dateSent: Date.now() 
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (error) {
            res.status(422).send(err);
        }
    })
}