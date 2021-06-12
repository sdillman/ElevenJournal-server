const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res) => {

    let { email, password } = req.body.user;
    try {
        const User = await UserModel.create({
            email,
            password
        });
    
        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.status(201).json ({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
        
    }

    // res.send("This is our user/register endpoint!");
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body.user;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
                password: password
            },
        });

        if (loginUser) {

            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.status(201).json ({
                message: "User successfully logged in",
                user: loginUser,
                sessionToken: token
            });
        } else {
            res.status(401).json ({
                message: "Login failed",
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }

});

module.exports = router;