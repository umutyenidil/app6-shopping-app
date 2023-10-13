const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const errorRoutes = require("./routes/error");

const path = require("path");

const sequelize = require('./utilities/database');
const Product = require('./models/product');
const Category = require('./models/category');

app.set('view engine', 'pug'); // express ile kullanmak istedigimiz view engine'i belirtiyoruz
app.set('views', './views'); // view engine icin view'lerimizin dosya yollarini belirtiyoruz

app.use(bodyParser.urlencoded({ extended: false }));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));

// routes
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);


// orm
Product.belongsTo(Category, {
  foreignKey: {
    field: 'category_uuid',
  }
});
Category.hasMany(Product);

sequelize.sync()
  .then((result)=>{
    console.log(result);
  })
  .catch((error)=>{
    console.log(error)
  });

app.listen(3000, () => {
  console.log("listening on port 3000");
});
