import Navbar from "./Screens/Navbar.js";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import "../css/UploadStudent.css";
const UploadStudent = (props) => {
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
<<<<<<< HEAD
  const [image, setImage] = useState("");
  const [Id,setId] = useState('');
  const [isAdd, setIsAdd] = useState(true);
=======
  // const [url, setURL] = useState("");
>>>>>>> 909a0b2a26b80cb9ec3978b862994a1c13c918b2
  const [data, setData] = useState("");
  const [prevData, setPrevData] = useState("");
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
          postData(data.url,data.public_id);
          public_id(data.public_id,data.url);
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function postData(url,public_id){
    if (url) {
      fetch(
        `http://localhost:4000/api/dataset/uploadStudentDs/${datasetName}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            studentName,
            RollNo:rollNo,
            Image: url,
            public_id
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

function editStudentData(id,Name,Img,RollNo){
  console.log(id)
  setStudentName(Name)
  setRollNo(RollNo)
  let url
  
  fetch(`http://localhost:4000/api/dataset/editStudentData/${id}`,{
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        studentName:Name,
        RollNo:RollNo,
        Image:Img,
        public_id:Name,
      }),
  }
  )

  .then((res)=>res.json())
  .then((resp)=>{
    console.log(resp)
    getStudentData();
    })
    
  .catch((er)=>console.log(er))

}

function public_id(img_id,url){
  return [img_id,url]
}


  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div>
        <form>
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
          <input type="button" value="Add Student"  onClick={submit} />
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
                    <img class="Delete"
                      src="../Image/outline_delete_black_24dp.png"
                      alt="delete" onClick={()=>{deleteStudentData(data[student]._id)}}
                    />
                    <img class="Edit"
                      src="../Image/outline_edit_black_24dp.png"
                      alt="edit" onClick={()=>{editStudentData(data[student]._id,data[student].studentName,data[student].Image,
                        data[student].RollNo)}}
                    />
                    {/* <div class="hide">Delete</div>
                    <div class="hide">Edit</div> */}
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
