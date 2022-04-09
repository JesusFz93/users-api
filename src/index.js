require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/config");

const rolesRoutes = require("./routes/roles.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/roles", rolesRoutes);
app.use("/api/users", usersRoutes);

dbConnection();

const PORT = process.env.PORT || "4001";
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
