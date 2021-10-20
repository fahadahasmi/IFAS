const express = require("express");
const router = express.Router();
const Dataset = require("../models/Datasets.js");
const StudentDs = require("../models/StudentDs.js");
const AttendRecords = require("../models/AttendanceModel.js");

router.post("/attend/:name", async (req, res) => {
  const { className, studentName, RollNo,Date,Image, Attendance } = req.body;
  try {
    let students = await AttendRecords.findOne({
        className: req.params.name,
        studentName,
        RollNo,
        Date,
        Image,
        Attendance,
    });
    console.log(students);
    if(students==null){
       AttendRecords.updateOne(
      {
        className: req.params.name,
        studentName,
        RollNo,
        Date,
        Image,
        Attendance,
      },{upsert:true}
    )
      .then((data) => {
        console.log(data)
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/attend/:name/:date", async (req, res) => {
  console.log(req.params.name);
  try {
    AttendRecords.find({
      className: req.params.name,
      Date: req.params.date,
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
