const { Router } = require('express');
const { adminModel } = require("../db");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "as5796as8dsd";




adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    // TODO: hash the password and use zod and put this inside a try catch block
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "signedup successfull"
    })
})

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({
        email: email,
        password: password
    })
    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD)
        res.json({
            token: token
        })
    } else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})


adminRouter.post("/course", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})


adminRouter.put("/course", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})


adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}