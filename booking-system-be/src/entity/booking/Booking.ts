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
    user: User;

}

export default Booking
