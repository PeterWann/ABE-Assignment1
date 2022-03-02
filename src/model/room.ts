import { Schema } from "mongoose";
import { Reservation, reservationSchema } from "./reservation";

export interface Room {
  roomNo: Number;
  available: boolean;
  reservations: Reservation[];
}

export const roomSchema: Schema = new Schema<Room>({
  roomNo: { type: Number, required: true },
  available: { type: Boolean, required: true },
  reservations: [
    { type: Schema.Types.ObjectId, ref: "Reservations", required: false },
  ],
});
