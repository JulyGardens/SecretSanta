import { ResponseCodes, ResponseMessages } from "@Helpers/enums";
import { CustomRequest, RegisterBody } from "@Helpers/types";
import UserService from "@Services/UserService";
import { Request, Response } from "express";

class UserController {
  public async registerUser(req: CustomRequest<RegisterBody>, res: Response) {
    try {
      const { firstName, lastName, wishes } = req.body;

      const formatedWishes = wishes
        .split(", ")
        .map((w, i) => `${++i}. ${w}`)
        .join("\n");

      const isAvailable = await this.checkAmount();

      if (!isAvailable) {
        return res.json({
          message: ResponseMessages.NO_REGISTRATION_SLOTS,
          code: ResponseCodes.OK,
        });
      }

      const registeredUser = await UserService.createUser({
        firstName,
        lastName,
        wishes: formatedWishes,
      });

      return res.json({
        userId: registeredUser.id,
        message: ResponseMessages.SUCCESS_REGISTRATION,
        code: ResponseCodes.OK,
      });
    } catch (err) {
      return res.json({
        error: err,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const allUsers = await UserService.getAll();

      return res.json({
        users: allUsers,
        code: ResponseCodes.OK,
      });
    } catch (err) {
      return res.json({
        customErr: err,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async getDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.json({
          message: ResponseMessages.NO_DATA,
          code: ResponseCodes.NOT_FOUND,
        });
      }

      const details = await UserService.getReceiver(Number(id));

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
  }

  private checkAmount() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const registredAmount = await UserService.getAll(true);

        if (registredAmount >= 500) {
          resolve(false);
        } else {
          resolve(true);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new UserController();
