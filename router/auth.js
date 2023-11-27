const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate")

require('../Db/conn');
const User = require('../model/userSchema');


router.get("/", (req, res) => {
    res.send(` Hello I am from from Homepage`)
});

router.post("/register", async (req, res) => {


    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "pls fill the information" });
    }
    try {
        const userexist = await User.findOne({ email: email });
        if (userexist) {
            return res.status(422).json({ message: "email is already taken" })
        } else if (password !== cpassword) {
            return res.status(422).json({ message: "password is not matching" })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            const registered = await user.save();
            if (registered) {
                 res.status(201).json({ message: "user registerd succesful" });
            }

        }
    }catch(error) {
        console.log(error);
    }
    
});
  
router.post("/login", async (req, res) => {
    try {

        let token
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "pls fill the form" });
        }

        const userlogin = await User.findOne({ email: email });

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
                
             token = await userlogin.generateAuthToken();
            console.log(token);

            res.cookie('token', token, {
                expires: new Date(Date.now() + 258920000000),
                httpOnly: true
            });

            if (!isMatch) {
                return res.status(400).json({ error: "user error" });
            }
            else {
                res.json({ message: "user login succesful" });
            }
        } else {
            res.status(400).json({ error: "invalid details" })
        }

    } catch (error) {
        console.log(error);
    }

});

router.get("/about", authenticate, (req, res) => {
    console.log("hello my about page");
    res.send(req.rootUser);
})

router.get("/getData", authenticate, (req, res) => {
    console.log("hello my contact page");
    res.send(req.rootUser);
})
router.post("/contact", authenticate, async(req, res) => {
    try {

        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            
            return res.json({ error: "plz fill the form" });
        }

        const userContact = await User.findOne({ _id: req.userId })
        if (userContact) {
            const userMessage =await userContact.addmessage(name, email, phone, message);
            await userMessage.save();
            res.status(201).json({message:"message succesfull"})
        }

        
    } catch (error) {
        console.log(error)
    }
})


router.get("/logout",  (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.status(200).send("User Logout");
})

module.exports = router;
