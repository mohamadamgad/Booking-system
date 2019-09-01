import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Booking from '../booking/Booking'

@Entity()
export class User {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    email: string

    @OneToMany(type => Booking, booking => booking.id)
    bookings: Booking[];
    
    static createUserFromJson(userJson) {
        const user = new User();
        user.name = userJson.name;
        user.age = userJson.age;
        user.email = userJson.email;
        return user;
    }

}

export default User;
