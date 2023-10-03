const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log('middleware 1 calistirildi');

    nextMiddleware();
});

app.use('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.send(`
    <html>
        <head>
            <title>Create Product</title>
        </head>
        <body>
            <form action="/product" method="POST">
                <input type="text" name="product_name">
                <input type="submit" value="Create Product">
            </form>
        </body>
    </html>
    `);
});

app.post('/product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log(incomingRequest.body);

    outgoingResponse.redirect('/');
});

app.use('/products', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.send('<h1>product list page</h1>');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});