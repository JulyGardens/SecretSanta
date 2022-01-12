import { ResponseCodes, ResponseMessages } from "@Helpers/enums";
import ShuffleManager from "@Managers/ShuffleManager";
import ShuffleService from "@Services/ShuffleService";
import { Router } from "express";

const router = Router();

router.post("/shuffle", async (req, res) => {
  try {
    const createdPairs = await ShuffleManager.shuffle();

    return res.json({
      createdPairs,
      message: ResponseMessages.SUCCESS_SHUFFLE,
      code: ResponseCodes.OK,
    });
  } catch (err) {
    return res.json({
      customErr: err,
      message: ResponseMessages.INTERNAL_SERVER_ERROR,
      code: ResponseCodes.INTERNAL_SERVER_ERROR,
    });
  }
});

router.get("/pairs", async (req, res) => {
  try {
    const allPairs = await ShuffleService.getAll();

    if (!allPairs.length) {
      return res.json({
        message: ResponseMessages.NO_PAIRS,
        code: ResponseCodes.NOT_FOUND,
      });
    }

    return res.json({
      pairs: allPairs,
      code: ResponseCodes.OK,
    });
  } catch (err) {
    return res.json({
      customErr: err,
      message: ResponseMessages.INTERNAL_SERVER_ERROR,
      code: ResponseCodes.INTERNAL_SERVER_ERROR,
    });
  }
});

export default router;
