const findUserQuery = "SELECT username username FROM users WHERE username =?";
const verifyUserQuery = "SELECT username username FROM users WHERE username = ? AND password = ?";
const createUserQuery = "INSERT INTO users(username, password) values (?, ?)";

module.exports = {
    findUserQuery,
    verifyUserQuery,
    createUserQuery
};