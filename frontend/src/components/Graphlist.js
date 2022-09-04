import React from "react";
import { useNavigate, generatePath } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";

const baseURL = "http://127.0.0.1:8081/graphlist";
function GraphList() {
  const [query, setQuery] = useState("");
  const [id, setId] = useState();

  const [graph, setGraph] = React.useState(null);

  let navigate = useNavigate(id);
  const routeChange = e => {
    id && navigate(generatePath("/graphdetails/:id", { id }));
  };
  const routeCreateGraph = () => {
    let path = `/creategraph`;
    navigate(path);
  };

  React.useEffect(() => {
    axios.get(baseURL).then(response => {
      console.log("response", response.data);
      setGraph(response.data);
    });
  }, []);

  if (!graph) return null;
  const deleteGraphID = id => {
    axios.delete(`${baseURL}/${id}`).then(res => {
      const del = graph.filter(grpahnode => id !== grpahnode.id);
      console.log("del", del);
      setGraph(del);
    });
  };

  return (
    <>
      <br />

      <div className="graphlist">
        <h2 className="text-center ">Node Graph List </h2>

        <div className="col-md-2 form-outline graphlist">
          Search Graph List Name:{" "}
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Enter Post Title"
            aria-label="Search"
            onChange={event => setQuery(event.target.value)}
          />
        </div>
        <button type="button" className="btn btn-success createPage" onClick={routeCreateGraph}>
          CreateGraph
        </button>
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th scope="col-lg-2">GraphID</th>
              <th scope="col-lg-2">GraphName</th>
              <th scope="col-lg-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {graph
              .filter(item => {
                if (query === "") {
                  return item;
                } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
                  return item;
                }
              })
              .map((item, i) => (
                <tr
                  key={i}
                  onClick={e => {
                    setId(item.id);
                  }}
                >
                  <td onClick={routeChange}>{item.id} </td>
                  <td onClick={routeChange}>{item.name}</td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => deleteGraphID(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GraphList;
