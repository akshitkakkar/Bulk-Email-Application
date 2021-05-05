const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient');
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //sub doc collection
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}, //reference to a particular instance of user
    //sets up relationship b/w this model and User model
    //relationship b/w survey and a very particular user
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);