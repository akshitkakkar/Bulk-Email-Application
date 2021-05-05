const keys = require('../config/keys')
const stripe = require("stripe")(
    keys.stripeSecretKey
);
const requireLogin = require('../middlewares/requireLogin')

module.exports = (app) =>{
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // if(!req.user) {
        //     return res.status(401).send({error: 'Unauthorized'});
        // }
        //PULL THE ABOVE LOGIC IN A SINGLE LOCATION TO GENERALIZE BACKEND AUTH
        //use it as second argument as above -> 'requireLogin'
        //not requireLogin() because we do not want to call it the instance express loads up the route handler
        //requireLogin reference used and gets executed only when call to this route is made
        //we can pass as many middlewares as we want as argument
        //eventually one of the middleware has to send back response to the user

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'inr',
            description: 'subscription to 5 bulk email credits',
            source: req.body.id
        })
        //current logged in user set up automatically by passport
        req.user.credits += 5;
        //presist the above changes
        const user = await req.user.save() //async request\
        res.send(user);
    })
}