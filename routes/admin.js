const express = require('express');
const router = express.Router();

// /admin/create-product => GET
router.get('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.send(`
    <html>
        <head>
            <title>Create Product</title>
        </head>
        <body>
            <form action="/admin/create-product" method="POST">
                <input type="text" name="product_name">
                <input type="submit" value="Create Product">
            </form>
        </body>
    </html>
    `);
});

// /admin/create-product => POST
router.post('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    console.log(incomingRequest.body);

    outgoingResponse.redirect('/');
});

module.exports = router;