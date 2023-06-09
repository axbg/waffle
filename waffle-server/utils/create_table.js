require('dotenv').config();

const createUsersTable = require('../modules/db').createUsersTable;

createUsersTable()
    .then(_ => {
        console.log("Table users was created");
    })
    .catch(_ => {
        console.log("Table users already exists");
    });
