const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");

router.post('/register', async (req, res) => {

    let { email, password } = req.body.user;
    try {
        const User = await UserModel.create({
            email,
            password
        });
    
        res.status(201).json ({
            message: "User successfully registered",
            user: User
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
            },
        });
        if (loginUser) {
            res.status(201).json ({
                message: "User successfully logged in",
                user: loginUser
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