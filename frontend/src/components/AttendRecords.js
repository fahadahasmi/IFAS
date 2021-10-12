import React, { useEffect, useState } from "react";
import Navbar from "./Screens/Navbar.js";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
const AttendRecords = () => {
  const [selectName, setSelectName] = useState("Class Name");
  const [data, setData] = useState("");
  const [studentData, setStudentData] = useState("");
  useEffect(()=>{
      getData();
      // eslint-disable-next-line 
  },[]);

  

  function getAttendanceData() {
    // eslint-disable-next-line 
    if(selectName=='Class Name'){
      console.log('Select a Class');
    }
    else{
      fetch(`http://localhost:4000/api/attend/attend/${selectName}`)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp)
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
    
  getAttendanceData();
  };
  
  console.log(selectName);
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
      </div>
      <div>
      <table>
            <tbody>
              <tr>
                <th>Sr No.</th>
                <th>Student's Name</th>
                <th>Image</th>
                <th>Attendance</th>
              </tr>
              {Object.keys(studentData).map((name,ind)=>(
                <tr>
      <td key={ind}>{ind + 1}</td>
      <td>{studentData[name].studentName}</td>
      <td><img src={studentData[name].Image} alt="Student" style={{width:60,height:60}} /></td>
    <td>Present</td>
    </tr>
              ))}
            </tbody>
          </table>
      </div>
    </>
  );
};

export default AttendRecords;
