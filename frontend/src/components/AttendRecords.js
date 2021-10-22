import React, { useEffect, useState,useRef,useContext } from "react";
import Navbar from "./Screens/Navbar.js";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import { userData } from "./Context/userContext.js";

const AttendRecords = () => {
  const [selectName, setSelectName] = useState("Class Name");
  const [data, setData] = useState("");
  const [studentData, setStudentData] = useState("");
  const showTable = useRef('');
   let today = new Date();
  const [selectDate, setSelectDate] = useState(today.toISOString().slice(0,10));
  const userName = useContext(userData);
  useEffect(()=>{
      getData();
      // eslint-disable-next-line 
  },[]);

  function getAttendanceData() {
    showTable.current.style.display = 'flex';
    // eslint-disable-next-line 
    if(selectName=='Class Name'){
      console.log('Select a Class');
    }
    else{
      fetch(`http://localhost:4000/api/attend/attend/${selectName}/${selectDate}`)
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
    let result = await fetch(`http://localhost:4000/api/dataset/upload/${userName.name}`);
    result = await result.json();
    console.log(result);
    setData(result);
  };
  
  console.log(selectName);
  console.log(selectDate);
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="selectClass">
        <label htmlFor="className">Select a Class:</label>
        <select
          id="className"
          value={selectName}
          onChange={(e) => {
            setSelectName(e.target.value);
          }}
        >
          <option value="Class Name">Class Name</option>
          {Object.keys(data).map((name, i) => (
            <option key={i} value={data[name].datasetName} onChange={()=>{}}>
              {data[name].datasetName}
            </option>
          ))}
        </select>
        <label htmlFor="className">Select a Date:</label>
        <input type="date" style={{width:'135px', height:'33px'}} value={selectDate}
          onChange={(e) => setSelectDate(e.target.value)} />
        <button onClick={getAttendanceData}>Show data</button>
      </div>
      <div>
      <table style={{display:'none'}} ref={showTable}>
            <tbody>
              <tr>
                <th>Roll No.</th>
                <th>Student's Name</th>
                <th>Image</th>
                <th>Attendance</th>
              </tr>
              {Object.keys(studentData).map((name,ind)=>(
                <tr>
      <td key={ind}>{studentData[name].RollNo}</td>
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
