import { Schema } from 'mongoose'
import { Room, roomSchema } from './room'

export interface Reservation {
    timestamp: Date,
    room: Room,
}

export const reservationSchema: Schema = new Schema<Reservation>({
    timestamp: { type: Date, required: true },
    room: { type: roomSchema, required: false }
})