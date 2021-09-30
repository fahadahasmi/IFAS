import React, { useRef,useEffect } from "react";
import Navbar from "./Screens/Navbar.js";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import * as faceapi from '@vladmandic/face-api';
// import { loadImage, Canvas, Image, ImageData } from 'canvas';
// import "../css/attendance.css";

// faceapi.env.monkeyPatch({ Canvas, Image, ImageData, fetch });
const Attendance = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL), //heavier/accurate version of tiny face detector
      ]).then(start);
    };
    loadModels();
  }, []);

  const start = () => {
    navigator.mediaDevices.getDisplayMedia(
      { video: true }
    ).then((stream) => (videoRef.current.srcObject = stream))
    .catch((err) => console.error(err)) 
      console.log(process.env.PUBLIC_URL);
    // recognizeFaces();
  };

  async function handelVideo() {
    const labeledDescriptors = await loadLabeledImages();
    console.log(labeledDescriptors);
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);
    console.log(faceMatcher + "<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>..");

    setInterval(async () => {
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
        return faceMatcher.findBestMatch(d.descriptor);
      });
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString(),
        });
        drawBox.draw(canvasRef.current);
      });
    }, 100);
  }

  function loadLabeledImages() {
    const labels = ["MSD"]; // for WebCam
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`MSDhoni.jpg`
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

  return (
    <>
    <Navbar />
    <Breadcrumbs />
      <div className="WebCam_container">
        <video
          autoPlay
          id="videoInput"
          ref={videoRef}
          width="720"
          height="550"
          onPlay={handelVideo}
          muted
        ></video>
        <canvas
          className="Canva_Conatiner"
          width="720"
          height="550"
          ref={canvasRef}
        />
      </div>
    </>
  );
};

export default Attendance;
