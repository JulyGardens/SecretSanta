import { ResponseCodes, ResponseMessages } from "@Helpers/enums";
import { CustomRequest, RegisterBody } from "@Helpers/types";
import UserManager from "@Managers/UserManager";
import { Router } from "express";

const router = Router();

router.post("/user/register", async (req: CustomRequest<RegisterBody>, res) => {
  try {
    const registeredUser = await UserManager.registerUser(req);

    return res.json({
      userId: registeredUser.id,
      message: ResponseMessages.SUCCESS_REGISTRATION,
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

router.get("/users", async (req, res) => {
  try {
    const allUsers = await UserManager.getUsers();

    return res.json({
      users: allUsers,
    });
  } catch (err) {
    return res.json({
      customErr: err,
      message: ResponseMessages.INTERNAL_SERVER_ERROR,
      code: ResponseCodes.INTERNAL_SERVER_ERROR,
    });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({
        message: ResponseMessages.NO_DATA,
        code: ResponseCodes.NOT_FOUND,
      });
    }

    const details = await UserManager.getDetails(Number(id));

    return res.json({
      receiverDetails: details,
      code: ResponseCodes.OK,
    });
  } catch (err) {
    return res.json({
      customErr: err,
      message: ResponseMessages.NO_DATA,
      code: ResponseCodes.NOT_FOUND,
    });
  }
});

export default router;
