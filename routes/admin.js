const { Router } = require('express');
const { adminModel, courseModel } = require("../db");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("..config");
const { adminMiddleware } = require('../middlewares/admin');




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


adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, price, imageUrl } = req.body;

    const course = await courseModel.create ({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        message: "course created",
        courseId: course._id
    })
})


adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })
    res.json({
        message: "course updated",
        courseId: course._id
    })
})


adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const courses = await courseModel.findOne({
        creatorId: adminId
    });
    res.json({
        message: "course updated",
        courses
    })

})

module.exports = {
    adminRouter: adminRouter
}