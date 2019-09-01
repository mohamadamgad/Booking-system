import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import User from '../user/User'

@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(type => User, user => user.bookings)
    user: number;


    static createBookingFromJson(bookingJson) {

        if(!bookingJson)
            return;

        const booking = new Booking();
        booking.title = bookingJson.title;
        booking.startDate = new Date(bookingJson.startDate);
        booking.endDate = new Date(bookingJson.endDate);
        booking.user = bookingJson.user;

        return booking;
    }

}

export default Booking
