import { useEffect, useState } from "react";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import getData from "../Service/getData.js";
import "./chart.css";

const Chart = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [location, setLocation] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  //fetch data from google sheet
  useEffect(() => {
    getData(data, setData);
  }, []);

  //Converting fetched data with preferable value attribute
  useEffect(() => {
    setNewData([]);
    for (let i = 0; i < 5000; i++) {
      setNewData((oldData) => [
        ...oldData,
        {
          Year: +data[i]?.Year,
          Risk: +data[i]?.["Risk Rating"],
          Asset: data[i]?.["Asset Name"],
          Category: data[i]?.["Business Category"],
          Lat: +data[i]?.Lat,
          Long: +data[i]?.Long,
          Location: +data[i]?.Lat + ", " + +data[i]?.Long, //Combine Lat and Long values into one coordinate
        },
      ]);
    }
  }, [data]);

  //get user-selected data
  useEffect(() => {
    setFilteredData(
      newData
        .filter((item) => item.Asset.includes(assetName))
        .filter((item) => item.Category.includes(businessCategory))
        .filter((item) => item.Location.includes(location))
    );
  }, [assetName, businessCategory, location]);

  //custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Year: ${payload[0].payload.Year}`}</p>
          <p className="label">{`Risk Rating: ${payload[0].payload.Risk}`}</p>
          <p className="label">{`Asset Name: ${payload[0].payload.Asset}`}</p>
          <p className="label">{`Business Category: ${payload[0].payload.Category}`}</p>
        </div>
      );
    }

    return null;
  };

  //chart component using Recharts library
  const renderLineChart = (
    <LineChart
      className="charts"
      width={850}
      height={600}
      data={filteredData}
      margin={{
        top: 10,
        right: 10,
        left: 10,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Year" type="number" domain={["dataMin", "dataMax"]} />
      <YAxis
        domain={[0, 1]}
        tickCount={7}
        tick={{ fontSize: 13, width: 300 }}
      />
      <Tooltip payload={filteredData} content={CustomTooltip} />
      <Legend />
      <Line type="monotone" dataKey="Risk" stroke="#8884d8" />
    </LineChart>
  );

  return (
    <div>
      <div>
        <h1>
          Asset Name:{" "}
          <span>
            <select
              value={assetName}
              onChange={(e) => setAssetName(e.currentTarget.value)}
              className="chartSelection"
            >
              <option value="" selected disabled></option>
              {newData //filter out duplicated Asset Names
                .filter(
                  (ele, ind) =>
                    ind ===
                    newData.findIndex((elem) => elem.Asset === ele.Asset)
                )
                .map((item, i) => (
                  <option key={i} value={item.assetName}>
                    {item.Asset}
                  </option>
                ))}
            </select>
          </span>
        </h1>
        <h1>
          Business Category:{" "}
          <span>
            <select
              value={businessCategory}
              onChange={(e) => setBusinessCategory(e.currentTarget.value)}
              className="chartSelection"
              disabled={assetName == ""}
            >
              <option value="" selected disabled hidden></option>
              {newData
                .filter(
                  //filter out duplicated Business Categories
                  (ele, ind) =>
                    ind ===
                    newData.findIndex((elem) => elem.Category === ele.Category)
                )
                .map((item, i) => (
                  <option key={i} value={item.businessCategory}>
                    {item.Category}
                  </option>
                ))}
            </select>
          </span>
        </h1>
        <h1>
          Location:{" "}
          <span>
            <select
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
              className="chartSelection"
              disabled={businessCategory == ""}
            >
              <option value="" selected></option>
              {newData
                .filter(
                  //filter out duplicated Locations
                  (ele, ind) =>
                    ind ===
                    newData.findIndex((elem) => elem.Location === ele.Location)
                )
                .map((item, i) => (
                  <option key={i} value={item.location}>
                    {item.Location}
                  </option>
                ))}
            </select>
          </span>
        </h1>
      </div>
      {filteredData.length === 0
        ? "No Data for the selected Geographic location"
        : assetName !== "" &&
          businessCategory !== "" &&
          location !== "" &&
          renderLineChart}
    </div>
  );
};

export default Chart;
