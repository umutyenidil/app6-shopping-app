const express = require('express');
const router = express.Router();

const path = require('path');

// /admin/create-product => GET
router.get('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('create-product', {
        title: 'Create Product Page'
    });
});

// /admin/create-product => POST
router.post('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log(incomingRequest.body);

    outgoingResponse.redirect('/');
});

module.exports = router;