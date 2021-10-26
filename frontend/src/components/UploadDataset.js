import Navbar from "./Screens/Navbar.js";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import "../css/UploadDataset.css";
// import {Link} from 'react-router-dom';
const UploadDataset = () => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [prevData, setPrevData] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  useEffect(() => {
    userInfo();
    getData();
    // eslint-disable-next-line
  }, []);
  const [datasetName, setDatasetName] = useState("");
  const submit = async () => {
    fetch(`http://localhost:4000/api/dataset/upload/${name.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datasetName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function userInfo(){
    fetch("http://localhost:4000/api/auth/user", {
      method: "POST",
      headers:{
        'auth-token':localStorage.getItem('token'),
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getData = async () => {
    let result = await fetch(`http://localhost:4000/api/dataset/upload/${name.name}`);
    result = await result.json();
    setData(result);
  };

  function editDs(name){
    setPrevData(name)
    setDatasetName(name);
    console.log(datasetName)
    console.log(prevData)
    setIsAdd(false);
  }
  getData();
  function editSubmit(){
    setIsAdd(true)
  }

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div>
        <div className="cont">
          <input
            type="text"
            placeholder="Name of the dataset"
            name="dataset"
            id="dataset"
            value={datasetName}
            onChange={(e) => {
              setDatasetName(e.target.value);
            }}
          />
          {
            isAdd?<button type="button" className="addDataset" onClick={submit}>
            Add Student
          </button>:
          <button type="button" className="addDataset" onClick={editSubmit}>
            Edit
          </button>
          }
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Sr. No.</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
              {Object.keys(data).map((name,ind)=>(
                <tr>
      <td key={ind}>{ind + 1}</td>
      <td>{data[name].datasetName}</td>
      <td>
        <img src="../Image/outline_delete_black_24dp.png" alt="delete" />
        <img src="../Image/outline_edit_black_24dp.png" alt="edit" onClick={()=>editDs(data[name].datasetName)} />
        <Link to={'/upload students/'+data[name].datasetName}><img
          src="https://img.icons8.com/material-sharp/24/000000/upload--v2.png"
          alt="upload" 
        /></Link>
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

export default UploadDataset;

