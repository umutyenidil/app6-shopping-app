const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('index');
});

router.get('/products', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.send('<h1>product list page</h1>');
});

module.exports = router;