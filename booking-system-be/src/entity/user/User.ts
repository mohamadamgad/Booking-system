import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Booking from '../booking/Booking'

@Entity()
export class User {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(type => Booking, booking => booking.id)
    bookings: Booking[];
    
    static createUserFromJson(userJson) {
        const user = new User();
        user.firstName = userJson.firstName;
        user.lastName = userJson.lastName;
        user.age = userJson.age;
        return user;
    }

}

export default User;
