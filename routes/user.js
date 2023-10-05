const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('index', {
        title: 'Home Page'
    });
});

router.get('/products', (incomingRequest, outgoingResponse, nextMiddleware) => {
    const products = [
        {
            name: 'Urun 1',
            description: 'Birinci urunun aciklamasi',
            image:'https://picsum.photos/128/128?random=1',
            price: '110',
        },
        {
            name: 'Urun 2',
            description: 'Ikinci urunun aciklamasi',
            image:'https://picsum.photos/128/128?random=1',
            price: '220',
        },
        {
            name: 'Urun 3',
            description: 'Ucuncu urunun aciklamasi',
            image:'https://picsum.photos/128/128?random=1',
            price: '330',
        },
        {
            name: 'Urun 4',
            description: 'Dorduncu urunun aciklamasi',
            image:'https://picsum.photos/128/128?random=1',
            price: '440',
        },
        {
            name: 'Urun 5',
            description: 'Besinci urunun aciklamasi',
            image:'https://picsum.photos/128/128?random=1',
            price: '550',
        },
    ];

    outgoingResponse.render('product-list', {
        title: 'Products',
        productList: products,
    });
});

module.exports = router;