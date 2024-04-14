const express = require('express');
const router = express.Router();
const univ_manager = require("../managers/universities");

router.get("/get_all",(req, res)=>{

    univ_manager.get_all().then((response)=>{
        res.send(response);
    }).catch(()=>{
        res.sendStatus(500);
    })
})

router.post("/add", (req, res)=>{
    console.log(req.body);
    univ_manager.add_univ(req.body).then((response)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        res.sendStatus(500);
    })
})

module.exports = router