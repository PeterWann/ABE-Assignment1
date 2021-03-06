import { Router, json } from "express";
import { Users } from "../controller/user-controller";

const router = Router();

router.get('/', Users.get);

router.get('/:uid', Users.getOne);

export const users = router;
