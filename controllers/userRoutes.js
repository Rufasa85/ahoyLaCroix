const express = require('express');
const router = express.Router();
const {User,Flavor} = require('../models');
const bcrypt = require("bcrypt")

//temp route: get all users with flavors
router.get("/",(req,res)=>{
    User.findAll({
        include:["Love","Hate"]
    }).then(users=>{
        res.json(users)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err})
    })
})
//signup
router.post("/",(req,res)=>{
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        bio:req.body.bio,
    }).then(newUser=>{  
        req.session.userId=newUser.id;
        req.session.loggedIn=true;
        newUser.addLove(req.body.loves).then(loveData=>{
            newUser.addHate(req.body.hates).then(hateData=>{
                res.json(newUser)
            })
        })
       
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err})
    })
    
})
//login
router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            //wrong email
           return  res.status(401).json({msg:"invalid login!"})
        } else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            //wrong password
           return  res.status(401).json({msg:"invalid login!"})
        } else {
            req.session.userId=foundUser.id;
            req.session.loggedIn=true;
            res.json(foundUser);
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err})
       
    })
    
})

//logout
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.json({msg:"logged out!"})
})
//add loved
router.post("/love/:flavorId",(req,res)=>{
    if(!req.session.loggedIn){
        return res.status(401).json({msg:"login first joetato!"})
    }
    User.findByPk(req.session.userId).then(foundUser=>{
        foundUser.addLove(req.params.flavorId).then(usr=>{
            console.log(usr);
            res.send("association added!")
        })
    })

})
//remove loved
router.delete("/love/:flavorId",(req,res)=>{
    if(!req.session.loggedIn){
        return res.status(401).json({msg:"login first joetato!"})
    }
    User.findByPk(req.session.userId).then(foundUser=>{
        foundUser.removeLove(req.params.flavorId).then(usr=>{
            console.log(usr);
            res.send("association added!")
        })
    })

})
//add hated
router.post("/hate/:flavorId",(req,res)=>{
    if(!req.session.loggedIn){
        return res.status(401).json({msg:"login first joetato!"})
    }
    User.findByPk(req.session.userId).then(foundUser=>{
        foundUser.addHate(req.params.flavorId).then(usr=>{
            console.log(usr);
            res.send("association added!")
        })
    })

})
//remove hated
router.delete("/hate/:flavorId",(req,res)=>{
    if(!req.session.loggedIn){
        return res.status(401).json({msg:"login first joetato!"})
    }
    User.findByPk(req.session.userId).then(foundUser=>{
        foundUser.removeHate(req.params.flavorId).then(usr=>{
            console.log(usr);
            res.send("association added!")
        })
    })

})
module.exports = router;