const verifyJwt = require('./jwt').verifyJwt;

const checkAuthCookie = (req, res, next) => {
    try {
        verifyJwt(req.cookies['X-AUTH-TOKEN']);
        next();
    } catch (ex) {
        res.clearCookie("X-AUTH-TOKEN");
        return res.status(403).send({ message: "Forbidden" });
    }
}

module.exports = {
    checkAuthCookie
};