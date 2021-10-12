const express = require('express');
const router = express.Router();
const Dataset = require('../models/Datasets.js');
const StudentDs = require('../models/StudentDs.js');
const AttendRecords = require('../models/AttendanceModel.js');

router.post('/attend/:name', async (req, res) => {
    const {className,studentName,RollNo,Image,Attendance} = req.body;
    try {
        let students = await StudentDs.findOne({className:req.params.name,studentName})
        console.log(students);
        AttendRecords.create({
            className:req.params.name,
            studentName,
            RollNo:students.RollNo,
            Image:students.Image,
            Attendance
        }).then((data)=>{
            res.json(data);
        }).catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({'error':"Internal server error"});
    }
});


router.get('/attend/:name',async (req,res)=>{
    console.log(req.params.name)
    try{
        AttendRecords.find({
            className:req.params.name
        }).then((data)=>{
            res.json(data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({'error':"Internal server error"});
    }
});

module.exports = router;