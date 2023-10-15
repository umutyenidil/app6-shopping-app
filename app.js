const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require('./utilities/database');

const app = express();
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const errorRoutes = require("./routes/error");



const Product = require('./models/product');
const Category = require('./models/category');
const User = require('./models/user');
const Admin = require('./models/admin');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.set('view engine', 'pug'); // express ile kullanmak istedigimiz view engine'i belirtiyoruz
app.set('views', './views'); // view engine icin view'lerimizin dosya yollarini belirtiyoruz

app.use(bodyParser.urlencoded({ extended: false }));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));


// session
app.use((incomingRequest, outgoingResponse, nextMiddleware)=>{
  Admin.findByPk('92e0401c-87b7-490d-a576-677fd8328724')
    .then((user)=>{
      incomingRequest.user = user;
      nextMiddleware();
    })
    .catch((error)=>{
      console.log(error);
    });
});

// routes
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

sequelize.sync()
  .then((result)=>{
    Admin.findByPk('92e0401c-87b7-490d-a576-677fd8328724')
      .then((user)=>{
        Cart.findOne({where:{userUuid:user.uuid}})
          .then((cart)=>{
            if(!cart){
              Cart.create({userUuid:user.uuid})
                .then((result)=>{
                  console.log(result);  
                })
                .catch((error)=>{
                  console.error(error);
                });
            }
          })
          .catch((error)=>{
            console.log(error);
          });
      })
      .catch((error)=>{
        console.log(error);
      });
  })
  .catch((error)=>{
    console.log(error)
  });

app.listen(3000, () => {
  console.log("listening on port 3000");
});
