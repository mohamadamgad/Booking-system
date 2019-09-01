import "reflect-metadata";
import { createConnection } from "typeorm";
import { Booking } from "../entity/booking/Booking";
import { request } from "https";
import {getManager} from "typeorm";
import * as bodyParser from 'body-parser';

const router = module.exports = require('express')()

router.use(bodyParser.json());

router.get('/', async (request, response) => {
    const bookings = await getManager().find(Booking);
    response.send(bookings);
});


router.post('/', async (request, response) => {
    console.log('request.body', request.body);
    const booking: Booking = Booking.createBookingFromJson(request.body);
    await getManager().save(booking);
})
