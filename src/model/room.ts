import { Schema } from "mongoose";
import { Reservation } from "./reservation";

export interface Room {
  _id: string;
  roomNo: Number;
  available: boolean;
  reservations: Reservation[];
}

export const roomSchema: Schema = new Schema<Room>({
  roomNo: { type: Number, required: true },
  available: { type: Boolean, required: true },
  reservations: [
    { type: Schema.Types.ObjectId, ref: "Reservations", required: false }, // Hvis reservation skal tilføjes, skal det tilføjes via id i json
  ],
});
