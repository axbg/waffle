const findUserQuery = "SELECT username username, password password FROM users WHERE username =?";
const createUserQuery = "INSERT INTO users(username, password) values (?, ?)";

module.exports = {
    findUserQuery,
    createUserQuery
};