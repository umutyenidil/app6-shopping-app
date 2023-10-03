const express = require('express');
const router = express.Router();

const path = require('path');

// /admin/create-product => GET
router.get('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    const viewPath = path.join(__dirname, '../', 'views', 'create-product.html' );
    outgoingResponse.sendFile(viewPath);
});

// /admin/create-product => POST
router.post('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log(incomingRequest.body);

    outgoingResponse.redirect('/');
});

module.exports = router;