const express = require('express');
const router = express.Router();
const Dataset = require('../models/Datasets.js');
const StudentDs = require('../models/StudentDs.js');

router.post('/upload',async (req,res)=>{
    const {datasetName} = req.body;
    Dataset.create({
        datasetName
    }).then((Data)=>{
        res.json(Data)
    }).catch((err)=>{
        console.error(err);
        res.status(500).send("Internal server error");
    })
});

router.post('/uploadStudentDs/:name',async (req,res)=>{
    const {className,studentName,RollNo,Image} = req.body;
    console.log(req.params.name)
    try{
        StudentDs.create({
            className:req.params.name,
            studentName,
            RollNo,
            Image
        }).then((data)=>{
            res.json(data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal server error");
    }
});

router.post('/editdatasetname/:name',async (req,res)=>{
    const {datasetName} = req.body;
    console.log(req.params.name)
    Dataset.findOneAndUpdateOne({
        datasetName:req.params.name
    },{datasetName}).then((Data)=>{
        res.json(Data)
    }).catch((err)=>{
        console.error(err);
        res.status(500).send("Internal server error");
    })
});

router.get('/deletedatasetname/:name',async (req,res)=>{
    const {datasetName} = req.body;
    console.log(req.params.name)
    Dataset.findOneAndDelete({
        datasetName:req.params.name
    },{datasetName}).then((Data)=>{
        res.json(Data)
    }).catch((err)=>{
        console.error(err);
        res.status(500).send("Internal server error");
    })
});

module.exports = router;