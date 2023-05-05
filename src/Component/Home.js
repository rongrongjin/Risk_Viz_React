import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="App">
      <div className="directoryContainer">
        <div className="directoryTitle">
          <h1>Welcome to Risk Viz Project Directory</h1>
        </div>
        <div className="directoryOptions">
          <Link to="/map" className="font">
            Map
          </Link>
          <Link to="/table" className="font">
            Table
          </Link>
          <Link to="/chart" className="font">
            Chart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
