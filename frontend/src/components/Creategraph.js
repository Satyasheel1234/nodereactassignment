import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8081/addgraph";
function Creategraph() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [graph, setGraph] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    axios.post(baseURL, { id: id, name: name }).then(response => {
      setGraph(response.data);
    });
    navigate("/");
  };

  return (
    <div className="col-md-4 col-md-offset-6">
      <div className="row">
      <form onSubmit={handleSubmit}>
      <div class="col-25">
        <label >ID:</label>
        </div>
        <div class="col-md-25">
          <input type="text" id="id" value={id} onChange={e => setId(e.target.value)} />
        </div>
        <div class="col-25">
        <label >Name:</label>
        </div>
        <div class="col-25">
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div class="col-25">
          <br></br>
        <button type="submit" className="col-25 btn btn btn-primary">
          submit
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Creategraph;
