const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);

const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');
const authRoutes = require('./routes/auth');
const UserModel = require('./models/user_model/user_model');

const HOST = 'localhost';
const PORT = 3000;
const DB_ADDRESS = `mongodb://${HOST}:27017/shopping_app`;

app.set('view engine', 'pug'); // express ile kullanmak istedigimiz view engine'i belirtiyoruz
app.set('views', './views'); // view engine icin view'lerimizin dosya yollarini belirtiyoruz

app.use(bodyParser.urlencoded({extended: false}));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));

app.use(cookieParser());

var store = new mongoDbStore({
    uri: DB_ADDRESS,
    collection: '_sessions'
});
app.use(session({
    secret: 'development',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1, // milliseconds * seconds * minutes * hours
    },
    store: store,
}));

// routes
app.use(async (incomingRequest, outgoingResponse, next) => {
    if (incomingRequest.session.user) {
        incomingRequest.user = incomingRequest.session.user;
    }

    next();
});

app.use('/auth', authRoutes);
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

mongoose.connect(DB_ADDRESS)
    .then(async (_) => {
        console.log('CONNECTED TO MONGODB');

        const user = await UserModel.readByUsername({username: 'umutyenidil'});

        if (!user) {
            await UserModel.create({
                username: 'umutyenidil',
                emailAddress: 'umutyenidil@gmail.com',
                password: 'test1234',
            });
        }

        app.listen(PORT);
    })
    .catch((error) => {
        console.error('MONGODB CONNECTION ERROR');
    });