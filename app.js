const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./utilitis/mongodbconnection");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(dashboardRoutes);
app.use(authRoutes);

app.get("/", (req, resp) => {
  resp.send("ok");
});

app.listen(3000, () => console.log("server started on 3000"));
