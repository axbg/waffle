const jwt = require('jsonwebtoken');
const secret = process.env.jwt_secret || "default_secret";

const createJwt = (username) => {
    return jwt.sign({ username: username }, secret, {
        expiresIn: "2 days"
    });
};

const verifyJwt = (token) => {
    return jwt.verify(token, secret);
};

module.exports = {
    createJwt,
    verifyJwt
}