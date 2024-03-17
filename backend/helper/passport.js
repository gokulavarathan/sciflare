
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const userModel = require("../model/userModel")
const mongoose = require('mongoose');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),secretOrKey: 'TestKey@123' };

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
const user = { id: jwt_payload.id };
if (user) {
    done(null, user);
} else {
    done(null, false);
}
});

passport.use(strategy);

function generateToken(payload) {
return jwt.sign(payload, jwtOptions.secretOrKey);
}


function verifyTokenWithPassport(req, res, next) {
    passport.authenticate('jwt', { session: false }, async(err, user, info) => {
    if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    const rec = await userModel.find({_id:new mongoose.Types.ObjectId(req.user.id)})
    req.userRole = rec[0].role;
    req.companyId = rec[0].companyId;

    next();
    })(req, res, next);
}

module.exports = { generateToken,verifyTokenWithPassport};
