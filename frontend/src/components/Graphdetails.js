import React from "react";
import Graph from "react-graph-vis";
import ReactDOM from "react-dom/client";
import "../../src/styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef } from "react";
import "../../src/network.css";

const baseURL = "http://127.0.0.1:8081/graphlist";

export default function Graphdetails() {
  const { id } = useParams();

  const [graph, setGraph] = React.useState(null);
  const renderAfterCalled = useRef(false);

  useEffect(
    () => {
      if (!renderAfterCalled.current) {
        if (id) {
          axios
            .get(`${baseURL}/${id}`)
            .then(res => {
              console.log(res.data);
              setGraph(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
      renderAfterCalled.current = true;
    },
    [id]
  );

  if (!graph) return null;

  const formattedEdges = [];
  graph.data.edges.forEach(x => {
    const obj = { from: x.source, to: x.target };
    formattedEdges.push(obj);
  });

  const formattedGraph = { nodes: graph.data.nodes, edges: formattedEdges };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const events = {
    select: function(event) {
      console.log("events", event);
      var { nodes, edges } = event;
    }
  };

  return (
    <div>
      <Graph
        graph={formattedGraph}
        options={options}
        events={events}
        getNetwork={network => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Graphdetails />);
