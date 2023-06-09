const bcrypt = require('bcrypt');
const promisify = require('util').promisify;

const saltRounds = 10;

const hash = async (password) => {
    return await (promisify(bcrypt.hash))(password, saltRounds);
}

const verifyPassword = async (password, hash) => {
    return await (promisify(bcrypt.compare))(password, hash);
}

module.exports = {
    hash,
    verifyPassword
}