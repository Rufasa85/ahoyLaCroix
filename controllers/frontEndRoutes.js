const express = require('express');
const router = express.Router();
const {User,Flavor} = require('../models');

//TODO: pass in auth state
router.get('/',(req,res)=>{
    res.render("home")
})
router.get('/login',(req,res)=>{
    //TODO: redirect authenticated users away from this page
    res.render("login")
})

//signup
router.get('/signup',(req,res)=>{
    //TODO: redirect authenticated users away from this page
    res.render("signup")
})
//profile
router.get("/user/:id",(req,res)=>{
    //TODO: protect, need to be logged in to view
    //TODO: check if its my profile
    User.findByPk(req.params.id,{
        include:["Love","Hate"]
    }).then(foundUser=>{
        const hbsUser = foundUser.toJSON();
        console.log(hbsUser)
        // res.json(hbsUser)
        res.render("profile",hbsUser)
    })
})

module.exports = router;