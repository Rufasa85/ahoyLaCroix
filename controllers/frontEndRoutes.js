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

module.exports = router;