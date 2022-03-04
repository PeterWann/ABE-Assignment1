import { json, Router } from "express";
import { Reservations } from "../controller/reservation-controller";

const router = Router();
router.use(json());

router.get("/", Reservations.get);

router.post("/", json(), Reservations.create);

router.get("/:uid", Reservations.getOne);

router.patch("/:uid", Reservations.update);

router.delete("/:uid", Reservations.remove);

export const reservations = router;
