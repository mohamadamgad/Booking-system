import "reflect-metadata";
import { Booking } from "../entity/booking/Booking";
import {getManager} from "typeorm";
import * as bodyParser from 'body-parser';

const router = module.exports = require('express')()

router.use(bodyParser.json());

router.get('/booking/:id', async (request, response) => {
    const bookings = await getManager().getRepository(Booking).findOne({user : request.params.id});;
    response.send(bookings);
});

router.get('/booking/getTitle/:title', async (request, response) => {
    const bookings = await getManager().getRepository(Booking).find({title : request.params.title});;
    response.send(bookings);
});

router.get('/', async (request, response) => {
    const booking = await getManager().find(Booking);
    response.send(booking);
});


router.post('/', async (request, response) => {
    const booking: Booking = Booking.createBookingFromJson(request.body);
    await getManager().save(booking);
    response.status(201);
    response.json();
})
