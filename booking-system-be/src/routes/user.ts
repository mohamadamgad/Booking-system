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

router.post('/', async (request, response) => {
    console.log('user add',  User.createUserFromJson(request.body));
    const user: User = User.createUserFromJson(request.body);
    console.log('request.body', request.body);
    await getManager().save(user);
})
