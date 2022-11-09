const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/api/users",userRoutes)

router.get("/session",(req,res)=>{
    res.json(req.session)
})

module.exports = router;