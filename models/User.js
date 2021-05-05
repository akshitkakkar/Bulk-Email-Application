const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0} //lets us specify other configurations
});

//to create model class and tell mongoose that this new collection needs to be created

mongoose.model('users', userSchema); //one argument means trying to fetch, two means trying to load
//mongoose does not override existing collection