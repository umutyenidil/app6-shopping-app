const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const path = require("path");

const sequelize = require('./utilities/database-orm');

const errorController = require('./controllers/error-controller');

app.set('view engine', 'pug'); // express ile kullanmak istedigimiz view engine'i belirtiyoruz
app.set('views', './views'); // view engine icin view'lerimizin dosya yollarini belirtiyoruz

app.use(bodyParser.urlencoded({ extended: false }));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));

// routes
app.use("/admin", adminRoutes);
app.use(userRoutes);

// error route
app.use(errorController.get404);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
