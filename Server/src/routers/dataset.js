const express = require("express");
const router = express.Router();
const Dataset = require("../models/Datasets.js");
const StudentDs = require("../models/StudentDs.js");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});
router.post("/upload", async (req, res) => {
  const { datasetName } = req.body;
  Dataset.create({
    datasetName,
  })
    .then((Data) => {
      res.json(Data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});
router.get("/upload", async (req, res) => {
  Dataset.find({})
    .then((Data) => {
      res.json(Data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

router.post("/uploadStudentDs/:name", async (req, res) => {
  const { className, studentName, RollNo, Image, public_id } = req.body;
  console.log(req.params.name);
  try {
    cloudinary.uploader.rename(public_id, studentName, (err, result) => {
      console.log(result);

      StudentDs.create({
        className: req.params.name,
        studentName,
        RollNo,
        Image: result.url,
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/uploadStudentDs/:name", async (req, res) => {
  console.log(req.params.name);
  try {
    StudentDs.find({
      className: req.params.name,
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.post("/editdatasetname/:name", async (req, res) => {
  const { datasetName } = req.body;
  console.log(req.params.name);
  Dataset.findOneAndUpdate(
    {
      datasetName: req.params.name,
    },
    { datasetName }
  )
    .then((Data) => {
      res.json(Data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
    StudentDs.updateMany(
      {
        className:req.params.name
      },
      {
        className:datasetName,
      },
    )
    .then((Data) => {
      console.log(Data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

router.get("/deletedatasetname/:name", async (req, res) => {
  const { datasetName } = req.body;
  console.log(req.params.name);
  StudentDs.findOneAndDelete(
    { className: req.params.name },
  ).catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });
  Dataset.findOneAndDelete(
    {
      datasetName: req.params.name,
    },
    { datasetName }
  )
    .then((Data) => {
      res.json(Data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/deleteStudentDS/:id", async (req, res) => {
  console.log(req.params.id);
  var id = req.params.id;
  let studName = await StudentDs.findById(id);
  console.log(studName);
  try {
    cloudinary.uploader.destroy(studName.studentName);
    StudentDs.findByIdAndDelete(id)
      .then((Data) => {
        res.json(Data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {}
});


module.exports = router;
