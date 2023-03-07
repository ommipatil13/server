const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router(); //capital spelling ka dyan rakh
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());



require('../db/conn');
const User = require("../model/userSchema");




// using promises

// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "please fill the details" });
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "email already exist" });
//             }

//             const user = new User({ name, email, phone, work, password, cpassword });

//             user.save().then(() => {
//                 res.status(201).json({ message: "user registered successfully" });
//             }).catch((err) => res.status(500).json({ error: " failed registered" }));
//         }).catch(err => { console.log(err); });

// console.log(name);
// console.log(email);

// console.log(req.body);
// console.log(req.body.name);
// console.log(req.body.email);
// res.json({message: req.body});
// res.send("my router page");

// });

// using async await

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "please fill the details" });
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            // yaha pe
            await user.save();

            res.status(201).json({ message: "user registered successfully" });
        }

    } catch (err) {
        console.log(err);

    }


});



// login route

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message:"awesome"});
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "please fill the details" });
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });


            if (!isMatch) {
                res.status(400).json({ error: "invalid credentials pass" });
            } else {
                res.json({ message: "user signin successfully" });
            }

        } else {
            res.status(400).json({ error: "invalid credentials" });
        }



    } catch (err) {
        console.log(err);
    }
});

// about us ka page

router.get('/about', authenticate, (req, res) => {
    console.log(`hello about`);
    res.send(req.rootUser);
});

// get user data for contact and home page bro understand 

router.get('/getData', authenticate, (req, res) => {
    console.log(`hello contact & home`);
    res.send(req.rootUser);
});

// contact ka page

router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "plzz filled the contact form" });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "user contact successfully" });
        }

    } catch (error) {
        console.log(error);
    }

});

//logout ka page

router.get('/logout', (req, res) => {
    console.log(`hello logout`);
    res.clearCookie('jwtoken', { path: '/' });  
    res.status(200).send('user logout');
});



module.exports = router;



