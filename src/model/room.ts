import { Schema } from 'mongoose'

export interface Room {
    roomNo: Number,
    available: boolean,
}

export const schema = new Schema<Room>({
    roomNo: { type: Number, required: true },
    available: { type: Boolean, required: true }
})