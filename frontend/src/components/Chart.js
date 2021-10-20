import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useState, useEffect } from "react";
const Chart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    let data = [];
    let result = await fetch("http://localhost:4000/api/dataset/studCount");
    result = await result.json();
    console.log(result);
    data.push(result);
    console.log(data);
    setData(result)
  }
  return (
    <div id="chart">
      <BarChart width={730} height={400} data={data}>
        <XAxis dataKey="datasetName" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 120, backgroundColor: "#ccc" }} />
        <Legend
          width={120}
          wrapperStyle={{
            top: 5,
            right: 5,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="Strength" fill="#005555" />
      </BarChart>
    </div>
  );
};

export default Chart;
