const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/api/users",userRoutes)
const frontEndRoutes = require("./frontEndRoutes");
router.use("/",frontEndRoutes)

router.get("/session",(req,res)=>{
    res.json(req.session)
})

module.exports = router;