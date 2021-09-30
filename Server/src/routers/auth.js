require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/User.js');
const googleUserModel = require('../models/GoogleUser');
const { check, body, validationResult } = require('express-validator');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const checkLogin = require('../middleware/checkLogin.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

router.post('/signUp', [
    body('username').isLength({ min: 3 }).withMessage('length should be greater than 3'),
    body('email').isEmail().normalizeEmail(),
    check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number')
], async(req, res) => {
    const { name, username, email, password, institute_name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (await userModel.findOne({ email }) || await userModel.findOne({ username })) {
        res.json({ error: 'User already exists' })
    }

    var salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password.toString(), salt);

    const data = {
        user: {
            id: userModel.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET_KEY);
    userModel.create({
            name,
            email,
            username,
            institute_name,
            password: encryptPassword
        }).then((savedUser) => {
            res.json({ authToken });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal server error");
        })

});

router.post('/signIn', [
    body('username').isLength({ min: 3 }).withMessage('length should be greater than 3'),
    check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number')
], async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username })
        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
        }

        const checkedPassword = await bcrypt.compare(password, user.password);
        if (!checkedPassword) {
            res.status(400).json({ error: "Invalid credentials" });
        }
        const data = {
            user: { id: user.id }
        }
        console.log(data)
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        res.json({ authToken })
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.get('/logout',(req,res)=>{
    res.token='none';
    res.send("Logout successfully");
});

router.post('/user', checkLogin, async(req, res) => {
    try {
        const user_id = req.user.id;
        console.log(user_id)
        const user = await userModel.findById(user_id).select("-password");
        console.log(user);
        const googleUser = await googleUserModel.findById(user_id);

        if(googleUser!=null){
            res.json(googleUser);
        }
        else{
            res.json(user);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.post('/googleAuth',async (req,res)=>{
    const {token} = req.body;
    const ticket = client.verifyIdToken({
        idToken:token,
        audience:process.env.CLIENT_ID
    });

    const {name,email,picture} = (await ticket).getPayload();
    // let getUser = await googleUserModel.findOne({email});
    let user = await googleUserModel.update({name,email},{name,email},{upsert:true});
    console.log(user);
    // if(!getUser || getUser==null){
    //      user = await googleUserModel.create({
    //          name,
    //          email
    //     });
    // }
    //     user = await googleUserModel.updateOne({
    //         name,
    //         email
    //     });
    let getUser = await googleUserModel.findOne({email});
    console.log(getUser);
    console.log(getUser.id);
    
    const data = {
        user: {
            id: getUser.id
        }
    }
    console.log(data);
    const authToken = jwt.sign(data, JWT_SECRET_KEY);
    res.json({authToken});
})

module.exports = router;