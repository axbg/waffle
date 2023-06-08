const sqlite = require('sqlite3');
const open = require('sqlite').open;

const DB = process.env.db_name || "default.db";
const query = require('./query');

const findUser = async (username) => {
    return await execute(async (db) => !!(await db.get(query.findUserQuery, [username])));
}

const verifyUser = async (username, password) => {
    return await execute(async (db) => !!(await db.get(query.verifyUserQuery, [username, password])));
};

const createUser = async (username, password) => {
    return await execute(async (db) => await db.run(query.createUserQuery, [username, password]));
};

const execute = async (method) => {
    const db = await open({ filename: DB, driver: sqlite.Database });
    const result = await method(db);
    db.close();

    return result;
};

module.exports = {
    findUser,
    verifyUser,
    createUser
}