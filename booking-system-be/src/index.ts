import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/user/User";

import * as express from 'express';
import routes = require('./routes')



const server = module.exports = require('express')();

server.use(routes);

server.listen(3000, function () {
    console.log('Booking app listening on port 3000!')
});

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
