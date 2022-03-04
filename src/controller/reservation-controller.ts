import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { reservationSchema } from "../model/reservation";
import { Room, roomSchema } from "../model/room";
import { VerifyRoles } from "../helper/verify-role";
import { userSchema } from "../model/user";
import { users } from "../router/users-router";

const orderConnection = mongoose.createConnection(
  "mongodb://localhost:27017/hotels"
);
const reservationModel = orderConnection.model(
  "Reservation",
  reservationSchema
);
const roomModel = orderConnection.model("Room", roomSchema);
const userModel = orderConnection.model("User", userSchema);

const get = async (req: Request, res: Response) => {
  if (VerifyRoles(true, true, false, req) === false) {
    res.status(403).json({
      message: "Unauthorized access. Manager and clerk only"
    })
  }
  const { f, t } = req.query;

  let filter = {};

  if (f && t) {
    filter = { ...filter, timestamp: { $gt: f, $lt: t } };
  } else {
    if (f) {
      filter = { ...filter, timestamp: { $gt: f } };
    }
    if (t) {
      filter = { ...filter, timestamp: { $lt: t } };
    }
  }

  let result = await reservationModel.find(filter, { __v: 0 }).lean();
  res.json(result);
};

const getOne = async (req: Request, res: Response) => {
  const { uid } = req.params;
  if (ObjectId.isValid(uid)) {
    let result = await reservationModel.find({ _id: uid }, { __v: 0 }).exec();
    res.json(result);
  } else {
    res.status(400).json({
      message: "Wrong ID length in param",
    });
  }
};

const create = async (req: Request, res: Response) => {
  const token = req.get('authorization')?.split(' ')[1]
  const jwt = decode(token as string, { json: true })
  
  if (req.body.room) {
    const bodyreq: Room = req.body.room;
    let roomId: string = bodyreq._id;
    if (ObjectId.isValid(roomId)) {
      let result = await roomModel.find({ _id: roomId }, { __v: 0 }).exec();
      if (result.length !== 0) {
        req.body.createdBy = await userModel.findById(jwt?.id)
        console.log(req.body.user);
        let { id } = await new reservationModel(req.body).save();
        res.json({ id });
      } else {
        res.status(404).json({
          message: "room not found",
        });
      }
    } else {
      res.status(400).json({
        message: "Wrong ID length in body",
      });
    }
  } else {
    let { id } = await new reservationModel(req.body).save();
    res.json({ id });
  }
};

const remove = async (req: Request, res: Response) => {
  if (VerifyRoles(true, true, false, req) === false) {
    res.status(403).json({
      message: "Unauthorized access. Manager and clerk only"
    })
  }
  const { uid } = req.params;
  if (ObjectId.isValid(uid)) {
    let result = await reservationModel.deleteOne({ _id: uid });
    res.json(result);
  } else {
    res.status(400).json({
      message: "Wrong ID length in param",
    });
  }
};

const update = async (req: Request, res: Response) => {
  const { uid } = req.params;
  if (ObjectId.isValid(uid)) {
    console.log(uid);
    if (req.body.room) {
      const bodyreq: Room = req.body.room;
      let roomId: string = bodyreq._id;
      if (ObjectId.isValid(roomId)) {
        let roomResult = await roomModel
          .find({ _id: roomId }, { __v: 0 })
          .exec();

        if (roomResult.length !== 0) {
          let result = await reservationModel
            .updateOne({ _id: uid }, req.body)
            .exec();
          res.json({ uid, result });
        }
      } else {
        res.status(400).json({
          message: "Wrong ID length in body",
        });
      }
    } else {
      let result = await reservationModel
        .updateOne({ _id: uid }, req.body)
        .exec();
      res.json({ uid, result });
    }
  } else {
    res.status(400).json({
      message: "Wrong ID length in param",
    });
  }
};

export const Reservations = {
  get,
  getOne,
  create,
  remove,
  update,
};
