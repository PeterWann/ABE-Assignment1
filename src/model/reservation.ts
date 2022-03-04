import { Schema } from "mongoose";
import { Room, roomSchema } from "./room";

export interface Reservation {
  _id: string;
  from: Date;
  to: Date;
  room: Room;
}

export const reservationSchema: Schema = new Schema<Reservation>({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  room: { type: Schema.Types.ObjectId, ref: "Room", required: false }, // // Hvis Room skal tilføjes, skal det tilføjes via id i json
});
