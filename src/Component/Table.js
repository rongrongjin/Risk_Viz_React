import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import getData from "../Service/getData.js";

const Table = () => {
  const [data, setData] = useState([]);

  //Fetch data from google sheet
  useEffect(() => {
    getData(data, setData);
  }, []);

  //customize table column
  const columns = [
    {
      name: "Asset Name",
      label: "Asset Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Lat",
      label: "Lat",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Long",
      label: "Long",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Business Category",
      label: "Business Category",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Risk Factors",
      label: "Risk Factors",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Year",
      label: "Year",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    rowsPerPage: 20,
    rowsPerPageOptions: [20, 50, 100],
  };

  return (
    <div>
      <div style={{ maxWidth: "100%" }}>
        {/* using MUIDataTable library for table */}
        <MUIDataTable
          columns={columns}
          data={data}
          title="Risk-viz Data"
          options={options}
        />
      </div>
    </div>
  );
};

export default Table;
