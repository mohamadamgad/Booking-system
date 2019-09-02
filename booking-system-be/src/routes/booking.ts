import "reflect-metadata";
import { createConnection } from "typeorm";
import { Booking } from "../entity/booking/Booking";
import { request } from "https";
import {getManager} from "typeorm";
import * as bodyParser from 'body-parser';

const router = module.exports = require('express')()

router.use(bodyParser.json());

router.get('/booking/:id', async (request, response) => {
    console.log('req params', request);
    const bookings = await getManager().getRepository(Booking).findOne({user : request.params.id});;
    response.send(bookings);
});

router.get('/booking/getTitle/:title', async (request, response) => {
    console.log('req params', request.params);
    const bookings = await getManager().getRepository(Booking).find({title : request.params.title});;
    response.send(bookings);
});

router.get('/', async (request, response) => {
    const booking = await getManager().find(Booking);
    response.send(booking);
});


router.post('/', async (request, response) => {
    // console.log('request.body', request.body);
    const booking: Booking = Booking.createBookingFromJson(request.body);
    await getManager().save(booking);
    console.log('NEW BOOKING', booking);
    response.status(201);
    response.json();
})
