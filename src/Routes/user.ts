import UserController from "Controllers/UserController";
import { Router } from "express";

const router = Router();

router.post("/user/register", UserController.registerUser);
router.get("/users", UserController.getUsers);
router.get("/user/:id", UserController.getDetails);

export default router;
