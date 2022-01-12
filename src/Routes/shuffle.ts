import ShuffleController from "Controllers/ShuffleController";
import { Router } from "express";

const router = Router();

router.post("/shuffle", ShuffleController.shuffle);
router.get("/pairs", ShuffleController.getAll);

export default router;
