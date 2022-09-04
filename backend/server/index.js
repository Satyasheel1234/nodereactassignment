var express = require("express");
const shortid = require("shortid");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var graph = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]
  })
);

var fs = require("fs");

app.post("/addgraph", function(req, res) {
  console.log(req.body);
  res.send(req.body);
});

app.get("/graphlist", cors(), function(req, res) {
  fs.readFile(__dirname + "/" + "graphs.json", "utf8", function(err, data) {
    graph = JSON.parse(data);
    res.end(data);
  });
});

app.get("/graphlist/:id", cors(), (req, res) => {
  fs.readFile(__dirname + "/" + "graphs.json", "utf8", function(err, data) {
    var graphResponse = JSON.parse(data);
    var getDataByGraphID = graphResponse.find(x => x.id == req.params.id);
    console.log(getDataByGraphID);
    res.end(JSON.stringify(getDataByGraphID));
  });
});

app.delete("/graphlist/:id", cors(), (req, res) => {
  fs.readFile(__dirname + "/" + "graphs.json", "utf8", function(err, data) {
    data = JSON.parse(data);
    let foundGraph = data.find(x => x.id == req.params.id);
    const index = graph.indexOf(foundGraph);
    data.splice(index, 1);
    console.log(foundGraph);
    res.end(JSON.stringify(foundGraph));
  });
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://localhost", host, port);
});
