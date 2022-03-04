import { Router, json } from "express";
import { Users } from "../controller/user-controller";

const router = Router();

router.post('/', json(), Users.create);

export const user = router;