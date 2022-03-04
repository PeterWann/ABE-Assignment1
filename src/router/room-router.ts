import { json, Router } from "express";
import { Rooms } from "../controller/room-controller";

const router = Router();
router.use(json());

router.get("/", Rooms.get);

router.post("/", json(), Rooms.create);

router.get("/:uid", Rooms.getOne);

router.patch("/:uid", Rooms.update);

router.delete("/:uid", Rooms.remove);

export const rooms = router;
