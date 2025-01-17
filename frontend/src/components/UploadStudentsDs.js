import Navbar from "./Screens/Navbar.js";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import "../css/UploadStudent.css";
const UploadStudent = (props) => {
  const [studentName, setStudentName] = useState("");
  const [preStudentName, setPreStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState("");
  const [Id,setId] = useState('');
  // const [url, setURL] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const [data, setData] = useState("");
  const { datasetName } = useParams();
  console.log(datasetName);

  useEffect(() => {
    getStudentData();
    // eslint-disable-next-line
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    console.log(studentName, rollNo, selectedFile);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "FaceRecognition");
    data.append("cloud_name", "fdn1");

    fetch("https://api.cloudinary.com/v1_1/fdn1/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.url){
          postData(data.url,data.public_id,data.signature);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function postData(url,public_id,signature){
    if (url) {
      fetch(
        `http://localhost:4000/api/dataset/uploadStudentDs/${datasetName}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem("token"),
          },
          body: JSON.stringify({
            studentName,
            RollNo:rollNo,
            Image: url,
            public_id,
            signature
          }),
        }
      )
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          getStudentData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getStudentData() {
    fetch(`http://localhost:4000/api/dataset/uploadStudentDs/${datasetName}`)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp)
        setData(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editStudentData(id,RollNo,Name,Image){
    setId(id);    
    setPreStudentName(Name);
    setStudentName(Name);
    setRollNo(RollNo);
    setImage(Image);
    setIsAdd(false)
  }

  function editStudent(){
    console.log(Id);
    console.log(preStudentName,studentName, rollNo, selectedFile);
    if(selectedFile){
      const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "FaceRecognition");
    // data.append("cloud_name", "fdn1");
    // data.append("api_key", "948386741555972");
    // data.append("api_secret", "J7U0jEwc4lP-7fFgl1wD299H-ME");
    // data.append("public_id", studentName);
    // data.append('overwrite', false);

    fetch("https://api.cloudinary.com/v1_1/fdn1/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.url){
          editData(data.url,data.public_id,data.signature);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      console.log(image);
      fetch(
        `http://localhost:4000/api/dataset/editStudentData/${Id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem("token"),
          },
          body: JSON.stringify({
            studentName,
            RollNo:rollNo,
            Image: image,
            public_id:preStudentName,
          }),
        }
      )
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          getStudentData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsAdd(true)
  }
  
  
  function editData(url,public_id,signature){
    if (url) {
      fetch(
        `http://localhost:4000/api/dataset/editStudentData/${Id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem("token"),
          },
          body: JSON.stringify({
            studentName,
            RollNo:rollNo,
            Image: url,
            prevImage:preStudentName,
            public_id,
            signature
          }),
        }
      )
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          getStudentData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

function deleteStudentData(id){
  console.log(id)
  fetch(`http://localhost:4000/api/dataset/deleteStudentDS/${id}`)
  .then((res)=>res.json())
  .then((resp)=>{
    console.log(resp)
    getStudentData();
    })
  .catch((er)=>console.log(er))
  
}


  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="uploadstdform">
        <form className='stdform'>
          <input
            type="text"
            name="studentName"
            value={studentName}
            onChange={(e) => {
              setStudentName(e.target.value);
            }}
            required
            placeholder="Name"
          />
          <input
            type="text"
            name="rollNo"
            value={rollNo}
            onChange={(e) => {
              setRollNo(e.target.value);
            }}
            placeholder="Roll No"
            required
          />
          <input
            type="file"
            accept="Image/*"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
            }}
            required
          />
          {
            isAdd?<input type="button" value="Add Student" className='stdformbtn'  onClick={submit} />:
            <input type="button" value="Edit Student" className='stdformbtn'  onClick={editStudent} />
          }
        </form>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Roll No.</th>
                <th>Student's Name</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
              {Object.keys(data).map((student,i) => (
                <tr>
                  <td key={i}>{data[student].RollNo}</td>
                  <td>{data[student].studentName}</td>
                  <td>
                    <img
                      src={data[student].Image}
                      alt="Student" 
                      style={{width:60,height:60}}
                    />
                  </td>
                  <td>
                    <img
                      src="../Image/outline_delete_black_24dp.png"
                      alt="delete" onClick={()=>{deleteStudentData(data[student]._id)}}
                    />
                    <img
                      src="../Image/outline_edit_black_24dp.png"
                      alt="edit" onClick={()=>{editStudentData(data[student]._id,data[student].RollNo,data[student].studentName,data[student].Image)}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UploadStudent;
