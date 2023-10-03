const express = require('express');
const app = express();

app.use((incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log('middleware 1 calistirildi');

    nextMiddleware(); // sonraki middleware'a gecilmesini saglar
});

app.use((incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log('middleware 2 calistirildi');

    outgoingResponse.send('<h1>hello from express.js</h1>');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});