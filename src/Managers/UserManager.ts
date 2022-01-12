import { CustomRequest, RegisterBody } from "@Helpers/types";
import { Users } from "@prisma/client";
import UserService from "@Services/UserService";

class UserManager {
  public registerUser(req: CustomRequest<RegisterBody>) {
    return new Promise<Users>(async (resolve, reject) => {
      const { firstName, lastName, wishes } = req.body;

      const formatedWishes = wishes
        .split(", ")
        .map((w, i) => `${++i}. ${w}`)
        .join("\n");

      try {
        const isAvailable = await this.checkAmount();
        if (!isAvailable) return reject("You can't register now.");

        const registeredUser = await UserService.createUser({
          firstName,
          lastName,
          wishes: formatedWishes,
        });

        resolve(registeredUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  public getUsers() {
    return new Promise<Users[]>(async (resolve, reject) => {
      try {
        const users = (await UserService.getAll()) as Users[];

        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }

  public getDetails(userId: number) {
    return new Promise<Users>(async (resolve, reject) => {
      try {
        const receiverDetails = await UserService.getReceiver(userId);

        resolve(receiverDetails);
      } catch (err) {
        reject(err);
      }
    });
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

export default new UserManager();
