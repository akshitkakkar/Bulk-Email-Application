module.exports = (req, res, next) => { //next function passes the request to next middleware in the chain
if(!req.user) {
    return res.status(401).send({error: 'Unauthorized'})
}

next(); //proceed with next middleware in chain
}