const express = require('express');
const app = express();

app.get('/', (incomingRequest, outgoingResponse) => {
    outgoingResponse.send('Hello world');
});

app.get('/api/v1/products', (incomingRequest, outgoingResponse) => {
    outgoingResponse.send('Products List');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});