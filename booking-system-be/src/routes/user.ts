import "reflect-metadata";
import { User } from "../entity/user/User";
import * as bodyParser from 'body-parser';
import {getManager} from "typeorm";


const router = module.exports = require('express')()

router.use(bodyParser.json());

router.get('/', async (request, response) => {
    const users = await getManager().find(User);
    response.send(users);
});

router.get('/user/:email', async (request, response) => {
    // console.log('req params', request);
    const user = await getManager().getRepository(User).findOne({email : request.params.email});;
    response.send(user);
    console.log('user by email', user );
});

router.post('/', async (request, response) => {
    console.log('user add',  User.createUserFromJson(request.body));
    const user: User = User.createUserFromJson(request.body);
    console.log('request.body', request.body);
    await getManager().save(user);
    response.status(201);
    response.json();
    // console.log('user response', request);
})
