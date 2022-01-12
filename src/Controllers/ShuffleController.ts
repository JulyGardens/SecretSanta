import { ResponseCodes, ResponseMessages } from "@Helpers/enums";
import utils from "@Helpers/utils";
import { Users } from "@prisma/client";
import ShuffleService from "@Services/ShuffleService";
import UserService from "@Services/UserService";
import { Request, Response } from "express";

class ShuffleController {
  public async getAll(req: Request, res: Response) {
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
  }

  public async shuffle(req: Request, res: Response) {
    try {
      const allUsers = (await UserService.getAll()) as Users[];
      const withoutSanta = new Set([...allUsers]);

      if (allUsers.length < 3) {
        return res.json({
          message: ResponseMessages.NOT_ENOUGH_PEOPLE,
          code: ResponseCodes.OK,
        });
      }

      for (const user of allUsers) {
        if (!withoutSanta.size) {
          const createdPairs = await ShuffleService.getAll();

          return res.json({
            message: ResponseMessages.SUCCESS_SHUFFLE,
            pairs: createdPairs,
            code: ResponseCodes.OK,
          });
        }

        withoutSanta.delete(user);
        const randomUser = utils.randomElement([...withoutSanta]);
        await ShuffleService.createPair(user.id, randomUser.id);

        withoutSanta.add(user);
        withoutSanta.delete(randomUser);
      }

      const createdPairs = await ShuffleService.getAll();

      return res.json({
        message: ResponseMessages.SUCCESS_SHUFFLE,
        pairs: createdPairs,
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
}

export default new ShuffleController();
