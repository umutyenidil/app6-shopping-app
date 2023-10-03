const express = require('express');
const router = express.Router();

router.get('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log('middleware 1 calistirildi');

    outgoingResponse.send('<h1>Home Page</h1>');
});

router.get('/products', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.send('<h1>product list page</h1>');
});

module.exports = router;