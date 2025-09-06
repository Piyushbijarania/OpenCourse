const { Router } = require('express');
const { userModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("..config");


userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    // TODO: hash the password and use zod and put this inside a try catch block
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "signedup successfull"
    })
})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email: email,
        password: password
    })
    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)
        res.json({
            token: token
        })
    } else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "purchase endpoint"
    })
});

module.exports = {
    userRouter: userRouter
}