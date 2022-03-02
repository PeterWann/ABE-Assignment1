import { Request, Response } from "express";
import mongoose from "mongoose";
import { reservationSchema } from "../model/reservation";

const orderConnection = mongoose.createConnection(
  "mongodb://localhost:27017/hotels"
);
const reservationModel = orderConnection.model("Reservation", reservationSchema);

const get = async (req: Request, res: Response) => {
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
  let result = await reservationModel.find({ _id: uid }, { __v: 0 }).exec();
  res.json(result);
};

const create = async (req: Request, res: Response) => {
  let { id } = await new reservationModel(req.body).save();
  res.json({ id });
};

const remove = async (req: Request, res: Response) => {
  const { uid } = req.params;
  let result = await reservationModel.deleteOne({ _id: uid });
  res.json(result);
};

const update = async (req: Request, res: Response) => {
  const { uid } = req.params;
  console.log(uid);
  let result = await reservationModel
    .updateOne({ _id: uid }, { $set: { amount: 100 } })
    .exec();
  res.json({ uid, result });
};

export const Reservations = {
  get,
  getOne,
  create,
  remove,
  update,
};
