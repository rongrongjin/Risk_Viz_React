import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
// import Image from "next/image";
import getData from "../Service/getData.js";
import greenLogo from "../Icon/green.png";
import redLogo from "../Icon/red.png";
import "./map.css";

const Map = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("2030");

  //Fetch data from google sheet
  useEffect(() => {
    getData(data, setData);
  }, []);

  //Green Icon
  const customIcon1 = new Icon({
    iconUrl: require("../Icon/green.png"),
    iconSize: [68, 68],
  });

  //Red Icon
  const customIcon2 = new Icon({
    iconUrl: require("../Icon/red.png"),
    iconSize: [68, 68],
  });

  return (
    <div>
      <div className="map">
        <h1>Select Year:</h1>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="yearSelection"
        >
          <option value="2030">2030</option>
          <option value="2040">2040</option>
          <option value="2050">2050</option>
          <option value="2060">2060</option>
          <option value="2070">2070</option>
        </select>
      </div>

      {/* using Leaflet map library */}
      <MapContainer
        center={[47.116386, -101.299591]}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data
          .filter((item) => item.Year === year)
          .map((item, i) => (
            <Marker
              position={[item.Lat, item.Long]}
              icon={item["Risk Rating"] < 0.5 ? customIcon1 : customIcon2}
              key={i}
            >
              <Popup className="popup">
                Asset Name: {item["Asset Name"]} <br /> Business Category:
                {item["Business Category"]} <br /> Risk Rating:
                {item["Risk Rating"]}
                <br /> Year: {item.Year}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <div>
        <img src={greenLogo} alt="greenIcon" width={50} height={50} />
        <span className="mapMarker">Risk Rating less than 0.5 </span>
        <img src={redLogo} alt="redLogo" width={50} height={50} />
        <span>Risk Rating greater than 0.5</span>
      </div>
    </div>
  );
};

export default Map;
