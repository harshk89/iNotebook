const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harshisagoodb$oy';

// ROUTE 1: Create a user using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name', "Name must be atleast 3 characters").isLength({min: 3}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({min: 5})
], async(req, res)=> {
    // console.log(req.body);

    //if there are bad requests, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);


    //Check if the user with this email already exists
    try {

        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({error: "Sorry, a user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //secPass = secured password
        //salt is some extra string added in the user password to make it more secure

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data= {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});
        
        // .then(user => res.json(user)).catch(err=> {console.log(err)
        //     res.json({error: "Please enter a unique vallue for email"})});
        // res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }

})



//ROUTE 2: Authenticate a user using: POST '/api/auth/login
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password can not be blank").exists()
], async(req, res)=> {
    //if there are bad requests, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user =  await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data= {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})



//ROUTE 3: Get logged in: POST '/api/auth/getuser'.  Login required
router.post('/getuser', fetchuser, async(req, res)=> {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router