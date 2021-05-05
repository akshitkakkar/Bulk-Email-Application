const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google',{
        scope: ['profile','email'] //what access we want to want
    }));
    
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => { //where req gets sent to after above middleware gets executed
            res.redirect('/surveys');
        }
        );
    //redirecting or passing control to passport authrnticate function

    app.get('/api/logout', (req, res) => {
        req.logout(); //automatically attached to req by passport
        //res.send(req.user);
        res.redirect('/');
    });
    
    //route handler
    // app.get('/',(req, res)=>{
    //     res.send({hi: 'there'});
    // });

    app.get('/api/currentUser',(req, res)=>{
        //res.send(req.session);
        res.send(req.user); //passport automatically attaches user to req obj among other things
    })
}