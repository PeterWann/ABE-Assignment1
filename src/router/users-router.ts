import { Router, json } from "express";
import { Users } from "../controller/user-controller";

const router = Router();

router.get('/', Users.get);

router.get('/:uid', Users.getOne);

router.post('/', json(), Users.create);

router.post('/login', Users.login);

export const users = router;
