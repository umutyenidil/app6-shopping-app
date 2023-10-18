const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const mongoConnect = require('./utilities/database').mongoConnect;

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');

app.set('view engine', 'pug'); // express ile kullanmak istedigimiz view engine'i belirtiyoruz
app.set('views', './views'); // view engine icin view'lerimizin dosya yollarini belirtiyoruz

app.use(bodyParser.urlencoded({ extended: false }));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));

// routes
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

// app.listen(3000, () => {
//   console.log("listening on port 3000");
// });

mongoConnect((client)=>{
  app.listen(3000);
  
});
