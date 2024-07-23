import React, { useEffect, useState } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Addresses = () => {
  const [data, setData] = useState([]);
  const [labelSearchQuery, setLabelSearchQuery] = useState("");
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [expanded, setExpanded] = useState({}); // State to keep track of expanded routers

  useEffect(() => {
    axios
      .get("http://192.168.0.66:5001/api/pppoe/read")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const updateLabel = (id, newLabel) => {
    console.log(`http://192.168.0.66:5001/api/pppoe/update/label/${id}`);
    axios
      .post(`http://192.168.0.66:5001/api/pppoe/update/label/${id}`, {
        label: newLabel,
      })
      .then((response) => {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, label: newLabel } : item
          )
        );
        console.log(response.data);
        setEditingId(null);
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
      });
  };

  const toggleExpanded = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const handleLabelSearchChange = (e) => {
    setLabelSearchQuery(e.target.value);
  };

  const handleClientSearchChange = (e) => {
    setClientSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(labelSearchQuery.toLowerCase())
  );

  return (
    <div className="Addresses pages">
      <h1>IP Addresses</h1>

      <FloatingLabel className="form-label" label="Search by Site">
        <Form.Control
          className="form-input"
          type="text"
          name="name"
          placeholder="Search by Site"
          value={labelSearchQuery}
          onChange={handleLabelSearchChange}
        />
      </FloatingLabel>

      <br />

      <FloatingLabel className="form-label" label="Search by IP address or username">
        <Form.Control
          className="form-input"
          type="text"
          name="name"
          placeholder="Search by IP address or username"
          value={clientSearchQuery}
          onChange={handleClientSearchChange}
        />
      </FloatingLabel>


       
      {Array.isArray(filteredData) ? (
        filteredData.map((item) => (
          <div key={item._id}>
            {editingId === item._id ? (
              <>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => {
                    setNewLabel(e.target.value);
                  }}
                />{" "}
                <button
                  onClick={() => {
                    setEditingId(null);
                  }}
                >
                  ❌
                </button>{" "}
                <button
                  onClick={() => {
                    updateLabel(item._id, newLabel);
                  }}
                >
                  ✅
                </button>
              </>
            ) : (
              <h2
                onClick={() => {
                  setEditingId(item._id);
                  setNewLabel(item.label);
                }}
                className="label"
              >
                {item.label}
              </h2>
            )}

            <div className="pppoe-info">
              {item.clients
                .filter(
                  (client) =>
                    client.ip
                      .toLowerCase()
                      .includes(clientSearchQuery.toLowerCase()) ||
                    client.username
                      .toLowerCase()
                      .includes(clientSearchQuery.toLowerCase())
                )
                .slice(0, expanded[item._id] ? item.clients.length : 5)
                .map((client) => (
                  <div className="important-info" key={client._id}>
                    <p>
                      <a href={`http://${client.ip}`}>{client.ip}</a> -{" "}
                      {client.username}
                    </p>
                  </div>
                ))}
              {item.clients.length > 5 && (
                <button onClick={() => toggleExpanded(item._id)}>
                  {expanded[item._id] ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Addresses;
