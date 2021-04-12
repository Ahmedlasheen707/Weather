const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
let projectData = {};
app.get("/", function (req, res) {
  res.sendFile("index.html");
});
app.get("/data", function (req, res) {
  console.log("[+] Request To Get Data");
  res.send(projectData);
});
app.post("/data", function (req, res) {
  console.log("[+] Request To Set Data");
  projectData = req.body;
  if (projectData) {
    res.send({ status: "ok" });
  } else {
    res.send({ stats: "proplem" });
  }
});
app.listen(3000, function () {
  console.log("server is running on port 3000");
});
