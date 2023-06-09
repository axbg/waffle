const createUsersTableQuery = "CREATE TABLE users (username, password)";
const findUserQuery = "SELECT username username, password password FROM users WHERE username =?";
const createUserQuery = "INSERT INTO users(username, password) values (?, ?)";

module.exports = {
    createUsersTableQuery,
    findUserQuery,
    createUserQuery
};