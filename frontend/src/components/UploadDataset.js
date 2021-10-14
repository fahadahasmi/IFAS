import Navbar from "./Screens/Navbar.js";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import "../css/UploadDataset.css";
// import {Link} from 'react-router-dom';
const UploadDataset = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const [datasetName, setDatasetName] = useState("");
  const submit = async () => {
    fetch("http://localhost:4000/api/dataset/upload", {
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

  const getData = async () => {
    let result = await fetch("http://localhost:4000/api/dataset/upload");
    result = await result.json();
    console.log(result);
    setData(result);
  };

  async function deleteDataset(){
    let deleteDataset = await fetch("http://localhost:4000/api/dataset/upload");
    deleteDataset = await deleteDataset.json();
    console.log(deleteDataset);
    getData();
  }

  console.log(typeof data);

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
          <button type="button" className="addDataset" onClick={submit}>
            {" "}
            Add Dataset
          </button>
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
        <img src="../Image/outline_delete_black_24dp.png" alt="delete" onClick={deleteDataset} />
        <img src="../Image/outline_edit_black_24dp.png" alt="edit" />
        <Link to={'/uploadStud/'+data[name].datasetName}><img
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
