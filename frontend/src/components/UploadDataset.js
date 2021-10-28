<<<<<<< HEAD
import Navbar from "./Screens/Navbar.js";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import "../css/UploadDataset.css";
// import {Link} from 'react-router-dom';
const UploadDataset = () => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [prevData, setPrevData] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const [isName, setIsName] = useState(false);
  useEffect(() => {
    userInfo();
    if (isName) {
      getData()
      setIsName(false)
    }
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

  function userInfo() {
    fetch("http://localhost:4000/api/auth/user", {
      method: "POST",
      headers: {
        'auth-token': localStorage.getItem('token'),
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data);
        setIsName(true);
        getData()
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
  getData();
  function editDs(id, name) {
    setPrevData(name)
    setDatasetName(name);
    setIsAdd(false);
  }

  function deleteDs(clsname) {
    console.log(clsname);
    console.log(name.name);
    fetch(`http://localhost:4000/api/dataset/deletedatasetname/${clsname}/${name.name}`)
    .then(res => res.json())
      .then((data) => {
        console.log(data)
        getData();
      })
      .catch((e) => console.log(e))
  }

  function editSubmit() {
    console.log(datasetName)
    console.log(prevData)
    fetch(`http://localhost:4000/api/dataset/editdatasetname/${prevData}/${name.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datasetName,
      }),
    }).then(res => res.json())
      .then((data) => {
        console.log(data)
        getData();
      })
      .catch((e) => console.log(e))
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
            required
          />
          {
            isAdd ? <button type="button" className="addDataset" onClick={submit}>
              Add Dataset
            </button> :
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
              {Object.keys(data).map((name, ind) => (
                <tr>
                  <td key={ind}>{ind + 1}</td>
                  <td>{data[name].datasetName}</td>
                  <td>
                    <img src="../Image/outline_delete_black_24dp.png" alt="delete" onClick={() => deleteDs(data[name].datasetName)} />
                    <img src="../Image/outline_edit_black_24dp.png" alt="edit" onClick={() => editDs(data[name]._id, data[name].datasetName)} />
                    <Link to={'/upload students/' + data[name].datasetName}><img
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
=======
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

>>>>>>> 909a0b2a26b80cb9ec3978b862994a1c13c918b2
