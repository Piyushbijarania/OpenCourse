const { Router } = require('express');
const { userMiddleware } = require('../middlewares/user');
const { purchaseModel } = require('../db');
const { courseModel } = require('../db');

const courseRouter = Router();



courseRouter.post("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    await purchaseModel.create({
        userId,
        courseId
    })
    // should check if he paid or not
    res.json({
        message: "purchase successfull!!"
    })
})

courseRouter.get("/preview", async (req, res) => {
    const courses = await courseModel.find({});
     res.json({
        courses
     })
})


module.exports = {
    courseRouter: courseRouter
}

