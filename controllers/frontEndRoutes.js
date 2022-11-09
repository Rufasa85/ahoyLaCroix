const express = require('express');
const router = express.Router();
const {User,Flavor} = require('../models');

router.get('/',(req,res)=>{
    res.render("home",{
        loggedIn:req.session.loggedIn,
        userId:req.session.userId
    })
})
router.get('/login',(req,res)=>{
    if(req.session.loggedIn){
        return res.redirect(`/user/${req.session.userId}`)
    }
    res.render("login",{
        loggedIn:false,
        userId:null
    })
})

//signup
router.get('/signup',(req,res)=>{
    if(req.session.loggedIn){
        return res.redirect(`/user/${req.session.userId}`)
    }
    res.render("signup",{
        loggedIn:false,
        userId:null
    })
})
//profile
router.get("/user/:id",(req,res)=>{
    if(!req.session.loggedIn){
        return res.redirect(`/login`)
    }
    User.findByPk(req.params.id,{
        include:["Love","Hate"]
    }).then(foundUser=>{
        if(!foundUser){
            return res.redirect("/404")
        }
        const hbsUser = foundUser.toJSON();
        console.log(hbsUser)
        hbsUser.loggedIn=true;
        hbsUser.userId=req.session.userId;
        //TODO: check if its my profile
        if(hbsUser.id===req.session.userId){
            hbsUser.isMyProfile=true;
        }
        // res.json(hbsUser)
        Flavor.findAll().then(flavors=>{
            //TODO: remove flavors already loved from array before sending to template
            const hbsFlavors = flavors.map(flav=>flav.toJSON())
            hbsUser.flavors = hbsFlavors
            console.log(hbsUser)
            res.render("profile",hbsUser)
        })
    })
})
router.get("/404",(req,res)=>{
    res.render("404")
})
router.get("*",(req,res)=>{
    res.render("404")
})
module.exports = router;