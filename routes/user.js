const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    const viewPath = path.join(__dirname, '../', 'views', 'index.html' );
    outgoingResponse.sendFile(viewPath);
});

router.get('/products', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.send('<h1>product list page</h1>');
});

module.exports = router;