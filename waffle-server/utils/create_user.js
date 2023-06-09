require('dotenv').config();

const findUser = require('../modules/db').findUser;
const createUser = require('../modules/db').createUser;

if (process.argv.length !== 4) {
    console.log("You must pass the username and the password");
    return;
}

findUser(process.argv[2])
    .then(existingUser => {
        if (existingUser) {
            console.log("A user with this username already exists");
            return;
        }

        createUser(process.argv[2], process.argv[3])
            .then(_ => {
                console.log("User was created");
            });
    });
