require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const routeIncident = require("./routes/incident.route");
const routeIncidentType = require("./routes/incidentType.route");
const dbConfig = require("./config/db");
const port = require("./config/server");

const mongoose = require("mongoose");

mongoose.connect(dbConfig.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);
console.log("Successful connection to the database");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(process.env.ROUTES_INCIDENT, routeIncident);
app.use(process.env.ROUTES_INCIDENT_TYPE, routeIncidentType);

app.get("/", (req, res) => {
    res.json("Hello world");
});

app.listen(port, () => {
    console.log("The server is running");
});