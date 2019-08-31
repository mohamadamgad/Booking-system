import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { User } from "../entity/user/User";

const router = module.exports = require('express')()


router.get('/', async (request, response) => {
    createConnection()
        .then(async connection => {
            const users = await connection.manager.find(User);
            response.send(users);
        })
        .catch(error => console.log(error));
});
