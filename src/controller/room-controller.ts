import { Request, Response } from "express";
import mongoose from "mongoose";
import { roomSchema } from "../model/room";

const orderConnection = mongoose.createConnection(
  "mongodb://localhost:27017/hotels"
);
const roomModel = orderConnection.model("Room", roomSchema);

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
  let result = await roomModel.find({ _id: uid }, { __v: 0 }).exec();
  res.json(result);
};

const create = async (req: Request, res: Response) => {
  let { id } = await new roomModel(req.body).save();
  res.json({ id });
};

const remove = async (req: Request, res: Response) => {
  const { uid } = req.params;
  let result = await roomModel.deleteOne({ _id: uid });
  res.json(result);
};

const update = async (req: Request, res: Response) => {
  const { uid } = req.params;
  console.log(uid);
  let result = await roomModel
    .updateOne({ _id: uid }, { $set: { amount: 100 } })
    .exec();
  res.json({ uid, result });
};

export const Rooms = {
  get,
  getOne,
  create,
  remove,
  update,
};
