const express = require('express');
const app = express();

app.use('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log('middleware 1 calistirildi');

    nextMiddleware();
});

app.use('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.send('<h1>create product page</h1>');
});

app.use('/products', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.send('<h1>product list page</h1>');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});