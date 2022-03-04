import { Schema } from "mongoose";
import { Room } from "./room";
import { User } from "./user";

export interface Reservation {
  _id: string;
  timestamp: Date;
  room: Room;
  createdBy: User;
}

export const reservationSchema: Schema = new Schema<Reservation>({
  timestamp: { type: Date, required: true },
  room: { type: Schema.Types.ObjectId, ref: "Room", required: false }, // // Hvis Room skal tilføjes, skal det tilføjes via id i json
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
});
