const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));

// routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

// error route
app.use((incomingRequest, outgoingResponse) => {
    outgoingResponse.status(404);
    outgoingResponse.send('<h1>Page Not Found</h1>');
});



app.listen(3000, () => {
    console.log('listening on port 3000');
});