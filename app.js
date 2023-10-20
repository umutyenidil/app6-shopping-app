const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const mongoConnect = require('./utilities/database').mongoConnect;

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');
const User = require("./models/user");

app.set('view engine', 'pug'); // express ile kullanmak istedigimiz view engine'i belirtiyoruz
app.set('views', './views'); // view engine icin view'lerimizin dosya yollarini belirtiyoruz

app.use(bodyParser.urlencoded({ extended: false }));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));

// routes
app.use(async (incomingRequest, outgoingResponse, nextMiddleware) => {
  const user = await User.readByEmailAddress('umutyenidil@shopy.com');
  incomingRequest.user = user;
  nextMiddleware();
});

app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

mongoConnect(async (client)=>{
  let user = await User.readByEmailAddress('umutyenidil@shopy.com');

  if(!user){
    await User.create({emailAddress: 'umutyenidil@shopy.com', password: 'test1234'});
  }

  app.listen(3000);
});
