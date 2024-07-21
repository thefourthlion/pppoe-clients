import React, { useEffect, useState } from "react";
import axios from "axios";

const Addresses = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/api/pppoe/read")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="Addresses pages">
      <h1>IP Addresses</h1>
      {data.map((item) => (
        <div className="pppoe-info" key={item._id}>
          <div className="important-info">
            <p>
              <strong>IP Address: </strong>
              <a href={`http://${item.ip}`}>{item.ip}</a> - {item.name}
            </p>
          </div>
          {/* <div className="time-info">
            <p>
              <strong>Uptime:</strong> {item.uptime}
            </p>
            <p>
              <strong>Timestamp:</strong> {item.timestamp}
            </p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Addresses;
