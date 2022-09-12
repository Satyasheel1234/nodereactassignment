import React from "react";
import { useNavigate, generatePath } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
const baseURL = "http://127.0.0.1:8081/graphlist";
function GraphList() {
  const [query, setQuery] = useState("");
  const [id, setId] = useState();
  const [graph, setGraph] = React.useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
        <div class="row">
          <div>
            <i class="fa fa-search" aria-hidden="true" />
          </div>

          <div class="col-3">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Enter Graph Name"
              aria-label="Search"
              onChange={event => setQuery(event.target.value)}
            />
          </div>
          <div class="col-6">
            <button type="button" className="btn btn-success createPage" onClick={routeCreateGraph}>
              New
            </button>
          </div>
        </div>
        <br />
        <table className="table">
          <thead className="bg-primary">
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
                    <button type="button" className="btn-danger" onClick={() => deleteGraphID(item.id)}>
                      <i class="fa fa-trash-o fa-lg" aria-hidden="true" />
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
