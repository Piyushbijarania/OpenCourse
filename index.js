const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());

app.post("/user/signup ", (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

app.post("/user/signin", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

app.get("/user/purchases", (req, res) => {
    res.json({
        message: "purchase endpoint"
    })
})


app.post("/course/purchases", (req, res) => {
    res.json({
        message: "purchase endpoint"
    })
})

app.get("/courses", (req, res) => {
     res.json({
        message: "courses endpoint"
     })
})




app.listen(3000);