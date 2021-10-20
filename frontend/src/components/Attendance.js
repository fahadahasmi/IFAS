import React, { useRef, useEffect, useState } from "react";
import Navbar from "./Screens/Navbar.js";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import * as faceapi from "@vladmandic/face-api";
import "../css/attendance.css";

const Attendance = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const startBtnRef = useRef();
  const stopBtnRef = useRef();
  const videoContain = useRef();
  const [studentData, setStudentData] = useState("");
  const [data, setData] = useState("");
  const [selectName, setSelectName] = useState("Class Name");
  let today = new Date();
  const [selectDate, setSelectDate] = useState(today.toISOString().slice(0,10));
  let attend = [];
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]);
    };
    loadModels();
    getData();
  }, []);

  console.log(selectName);
  console.log(selectDate);

  const start = () => {
    if (selectName !== "Class Name") {
      navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then((stream) => {
          if (stream) {
            startBtnRef.current.style.display = "none";
            stopBtnRef.current.style.display = "block";
            videoRef.current.srcObject = stream;
            videoContain.current.style.display = "flex";
          }
        })
        .catch((err) => console.error(err));
      getStudentData();
      console.log(data);
    } else {
      alert("Please select a class name");
    }
  };

  async function handelVideo() {
    const labeledDescriptors = await loadLabeledImages();
    console.log(labeledDescriptors);
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);
    console.log(faceMatcher + "<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>..");

    // setInterval(async () => {

    // }, 100);
    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
      videoRef.current
    );
    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };
    faceapi.matchDimensions(canvasRef.current, displaySize);

    const detections = await faceapi
      .detectAllFaces(videoRef.current)
      .withFaceLandmarks()
      .withFaceDescriptors();
    console.log(detections);
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const results = resizedDetections.map((d) => {
      const bestMatch = faceMatcher.findBestMatch(d.descriptor);
      console.log(bestMatch.toString());
      let clean = bestMatch.toString().replace(/[()]/g, "");
      clean = clean.replace(/\d+([,.]\d+)?/g, "");
      console.log(clean.substring(0, clean.length - 1));
      attend.push(clean.substring(0, clean.length - 1));
      return faceMatcher.findBestMatch(d.descriptor);
    });

    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      });
      drawBox.draw(canvasRef.current);
    });

    postAttend();
  }

  function getStudentData() {
    // eslint-disable-next-line
    if (selectName == "Class Name") {
      console.log("Select a Class");
    } else {
      fetch(`http://localhost:4000/api/dataset/uploadStudentDs/${selectName}`)
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          setStudentData(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const getData = async () => {
    let result = await fetch("http://localhost:4000/api/dataset/upload");
    result = await result.json();
    console.log(result);
    setData(result);
  };

  function loadLabeledImages() {
    const labels = []; // for WebCam
    // eslint-disable-next-line
    Object.keys(studentData).map((names) => {
      labels.push(studentData[names].studentName);
    });
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(
            `https://res.cloudinary.com/fdn1/image/upload/v1633338977/${label}.jpg`
          );
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          console.log(label + i + JSON.stringify(detections));
          descriptions.push(detections.descriptor);
        }
        // document.body.append(label + " Faces Loaded | ");
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }

  function postAttend() {
    let records = [];
    // eslint-disable-next-line
    Object.keys(studentData).map((data) => {
      records.push(studentData[data].studentName);
    });
    records.sort();
    console.log(records);
    // eslint-disable-next-line
    if (selectName == "Class Name") {
      console.log("Select a Class");
    } else {
      attend.sort();
      console.log(attend);
      // eslint-disable-next-line
      Object.keys(studentData).map((stud) => {
        // eslint-disable-next-line
        attend.map((name) => {
          if (name === studentData[stud].studentName) {
            console.log(name + " present");
            fetch(`http://localhost:4000/api/attend/attend/${selectName}`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify({
                studentName: studentData[stud].studentName,
                RollNo: studentData[stud].RollNo,
                Image: studentData[stud].Image,
                Date: selectDate,
                Attendance: "present",
              }),
            })
              .then((res) => res.json())
              .then((resp) => {
                console.log(resp);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      });
    }
  }

  function stop() {
    let tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    videoContain.current.style.display = "none";
    stopBtnRef.current.style.display = "none";
    startBtnRef.current.style.display = "block";
    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, 100, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="selectClass">
        <label htmlFor="className">Select a Class:</label>
        <select
          id="className"
          value={selectName}
          onChange={(e) => setSelectName(e.target.value)}
        >
          <option value="Class Name">Class Name</option>
          {Object.keys(data).map((name, i) => (
            <option key={i} value={data[name].datasetName}>
              {data[name].datasetName}
            </option>
          ))}
        </select>
        <label htmlFor="className">Select a Date:</label>
        <input
          type="date"
          style={{ width: "135px", height: "33px" }}
          value={selectDate}
          onChange={(e) => setSelectDate(e.target.value)}
        />
      </div>
      <div className="attendContainer">
        <div className="WebCam_container" ref={videoContain}>
          <video
            autoPlay
            id="videoInput"
            ref={videoRef}
            width="700"
            height="550"
            onPlay={handelVideo}
            muted
          ></video>
          <canvas
            className="Canva_Conatiner"
            width="700"
            height="550"
            ref={canvasRef}
          />
        </div>
        <div id="buttons">
          <button
            className="share"
            style={{ background: "#25c948" }}
            onClick={start}
            ref={startBtnRef}
          >
            Start share
          </button>
          <button
            className="share"
            style={{ display: "none", background: "#f74848" }}
            onClick={stop}
            ref={stopBtnRef}
          >
            Stop share
          </button>
        </div>
      </div>
    </>
  );
};

export default Attendance;
