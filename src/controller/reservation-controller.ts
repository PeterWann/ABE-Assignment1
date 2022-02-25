import { Request, Response } from "express";
import mongoose from "mongoose";
import { schema } from "../model/reservation";

const orderConnection = mongoose.createConnection(
  "mongodb://localhost:27017/hotels"
);
const reservationModel = orderConnection.model("Reservation", schema);

const get = async (req: Request, res: Response) => {
 
};

const getOne = async (req: Request, res: Response) => {

};

const create = async (req: Request, res: Response) => {

};

const remove = async (req: Request, res: Response) => {

};

const put = async (req: Request, res: Response) => {

};

const update = async (req: Request, res: Response) => {
 
};

export const Reservations = {
  get,
  getOne,
  create,
  remove,
  put,
  update
};
