require('dotenv').config();

const express = require('express');
const serveIndex = require('serve-index');
const cookieParser = require('cookie-parser');

const checkAuthCookie = require('./modules/auth.js').checkAuthCookie;
const { verifyUser } = require('./modules/db.js');
const jwt = require('./modules/jwt.js');

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/content', checkAuthCookie, serveIndex(process.env.images_path));
app.use('/content', checkAuthCookie, express.static(process.env.images_path));

app.post('/login', async (req, res) => {
    if (await verifyUser(req.body.username, req.body.password)) {
        res.cookie('X-AUTH-TOKEN', jwt.createJwt(req.body.username), { httpOnly: true });
        res.status(200).send({ path: "/content" });
    } else {
        res.status(403).send({ response: "Not Allowed" });
    }
});

app.use('/', express.static('dist'));

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("App started on http://localhost:" + port);
});