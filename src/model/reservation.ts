import { Schema } from 'mongoose'

export interface Reservation {
    timestamp: Date
}

export const schema = new Schema<Reservation>({
    timestamp: { type: Date, required: true },
})