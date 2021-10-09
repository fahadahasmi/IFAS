import { Link } from "react-router-dom";
import "../css/style.css";
import Chart from "./Chart";
import Breadcrumbs from "./Screens/Breadcrumbs";
import Navbar from "./Screens/Navbar";

const Home = () => {
  return (
    <>
      <div>
        
        <Navbar />

        <Breadcrumbs />
        
        <section className="buttonsSection">
          <div className="container">
            <Link to="/attendance">
              <div>
                <h5>Get attendance</h5>
              </div>
            </Link>
            <Link to="/upload">
              <div>
                <h5>Upload dataset</h5>
              </div>
            </Link>
            <Link to="/attendRecords">
              <div>
                <h5>Attendance Records</h5>
              </div>
            </Link>
          </div>
        </section>
        <section id="chartSection">
          <div className="chart">
            <Chart />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
