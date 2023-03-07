const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const path = require ("path");

dotenv.config({ path: './config.env' });
require('./db/conn');

//const User = require('./model/userSchema');

app.use(express.json());

//we make router file to make our router easy

app.use(require('./router/auth')); //.js likhne ki jarurat nhi



    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });


const PORT = process.env.PORT || 5000;



//middleware 

// const middleware = (req, res, next) => {
//     console.log(`hello middleware`);
//     next();
// };


// app.get('/', (req, res) => {
//     res.send(`Hello world from the server app js`);
// });

// app.get('/contact', (req, res) => {
//     // res.cookie("Test", 'patil');
//     res.send(`Hello contact from the server`);
// });

// app.get('/about', (req, res) => {
//     console.log(`hello about`);
//     res.send(`hello about from the server`);
// });

app.get('/signin', (req, res) => {
    res.send(`signin page`);
});

app.get('/signup', (req, res) => {
    res.send(`signup page`);
});




app.listen(PORT, () => {
    console.log(`hello server is running in ${PORT}`);
});
