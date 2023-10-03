const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));

// routes
app.use("/admin", adminRoutes);
app.use(userRoutes);

// error route
app.use((incomingRequest, outgoingResponse) => {
  outgoingResponse.status(404);
  const viewPath = path.join(__dirname, "../", "views", "404.html");
  outgoingResponse.sendFile(viewPath);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
