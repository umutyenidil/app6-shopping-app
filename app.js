const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');
const authRoutes = require('./routes/auth');
const UserModel = require('./models/user_model/user_model');

app.set('view engine', 'pug'); // express ile kullanmak istedigimiz view engine'i belirtiyoruz
app.set('views', './views'); // view engine icin view'lerimizin dosya yollarini belirtiyoruz

app.use(bodyParser.urlencoded({extended: false}));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));

app.use(cookieParser());
app.use(session({
    secret: 'development',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1, // milliseconds * seconds * minutes * hours
    }
}));

// routes
app.use(async (incomingRequest, outgoingResponse, nextMiddleware) => {

    const user = await UserModel.readByUsername({username: 'umutyenidil'});

    incomingRequest.user = user;
    nextMiddleware();
});

app.use('/auth', authRoutes);
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

mongoose.connect('mongodb://localhost:27017')
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

        app.listen(3000);
    })
    .catch((error) => {
        console.error('MONGODB CONNECTION ERROR');
    });