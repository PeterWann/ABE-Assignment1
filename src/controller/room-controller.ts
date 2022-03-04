import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Reservation, reservationSchema } from "../model/reservation";
import { roomSchema } from "../model/room";
import { Reservations } from "./reservation-controller";

const orderConnection = mongoose.createConnection(
  "mongodb://localhost:27017/hotels"
);
const roomModel = orderConnection.model("Room", roomSchema);
const reservationModel = orderConnection.model(
  "Reservation",
  reservationSchema
);

const get = async (req: Request, res: Response) => {
  const { a } = req.query;

  let filter = {};

  if (a) {
    filter = { available: a };
  }

  let result = await roomModel.find(filter, { __v: 0 }).lean();
  res.json(result);
};

const getOne = async (req: Request, res: Response) => {
  const { uid } = req.params;
  if (ObjectId.isValid(uid)) {
    let result = await roomModel.find({ _id: uid }, { __v: 0 }).exec();
    res.json(result);
  } else {
    return res.status(400).json({
      message: "Wrong ID length in param",
    });
  }
};

const create = async (req: Request, res: Response) => {
  if (req.body.reservations) {
    const bodyreq: Reservation[] = req.body.reservations;
    let reservationIdsArray: string[] = [];
    for (let index = 0; index < bodyreq.length; index++) {
      reservationIdsArray.push(bodyreq[index]._id);
    }
    for (let index = 0; index < reservationIdsArray.length; index++) {
      if (ObjectId.isValid(reservationIdsArray[index])) {
        let result = await reservationModel
          .find({ _id: reservationIdsArray[index] }, { __v: 0 })
          .exec();
        if (result.length !== 0) {
          let { id } = await new roomModel(req.body).save();
          res.json({ id });
        } else {
          return res.status(404).json({
            message: "reservation not found",
          });
        }
      } else {
        return res.status(400).json({
          message: "Wrong ID length in body",
        });
      }
    }
  } else {
    let { id } = await new roomModel(req.body).save();
    res.json({ id });
  }
};

const remove = async (req: Request, res: Response) => {
  const { uid } = req.params;
  if (ObjectId.isValid(uid)) {
    let result = await roomModel.deleteOne({ _id: uid });
    res.json(result);
  } else {
    return res.status(404).json({
      message: "reservation not found",
    });
  }
};

const update = async (req: Request, res: Response) => {
  const { uid } = req.params;
  if (ObjectId.isValid(uid)) {
    if (req.body.reservations) {
      const bodyreq: Reservation[] = req.body.reservations;
      let reservationIdsArray: string[] = [];
      for (let index = 0; index < bodyreq.length; index++) {
        reservationIdsArray.push(bodyreq[index]._id);
      }
      for (let index = 0; index < reservationIdsArray.length; index++) {
        if (ObjectId.isValid(reservationIdsArray[index])) {
          let resResult = await reservationModel
            .find({ _id: reservationIdsArray[index] }, { __v: 0 })
            .exec();
          if (resResult.length !== 0) {
            let result = await roomModel
              .updateOne({ _id: uid }, req.body)
              .exec();
            res.json({ uid, result });
          } else {
            return res.status(404).json({
              message: "reservation not found",
            });
          }
        } else {
          return res.status(400).json({
            message: "Wrong ID length in body",
          });
        }
      }
    } else {
      let result = await roomModel.updateOne({ _id: uid }, req.body).exec();
      res.json({ uid, result });
    }
  } else {
    return res.status(400).json({
      message: "Wrong ID length in param",
    });
  }
};

export const Rooms = {
  get,
  getOne,
  create,
  remove,
  update,
};
