import "reflect-metadata";
import {createConnection} from "typeorm";

import routes = require('./routes')


createConnection().then(async connection => {
    const server = module.exports = require('express')();

    server.use(routes);

    server.listen(3000, function () {
        console.log('Booking app listening on port 3000!')
    });

    server.options("/*", function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.sendStatus(200);
    });
    
    server.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
})
