import { Router, json } from "express";
import { Users } from "../controller/user-controller";

const router = Router();

router.post('/', json(), Users.login);

export const login = router;
