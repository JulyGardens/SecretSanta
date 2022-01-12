import { RegisterBody } from "@Helpers/types";
import { Users } from "@prisma/client";
import DatabaseClient from "@Structure/DatabaseClient";

class UserService {
  public createUser(options: RegisterBody) {
    return new Promise<Users>(async (resolve, reject) => {
      try {
        const { firstName, lastName, wishes } = options;

        const createdUser = await DatabaseClient.users.create({
          data: {
            firstName,
            lastName,
            wishes,
          },
        });

        resolve(createdUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  public removeUser(userId: number) {
    return new Promise<Users>(async (resolve, reject) => {
      try {
        const removedUser = await DatabaseClient.users.delete({
          where: {
            id: userId,
          },
        });

        resolve(removedUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  public getReceiver(userId: number) {
    return new Promise<Users>(async (resolve, reject) => {
      try {
        const inPair = await DatabaseClient.usersPair.findFirst({
          where: {
            santaId: userId,
          },
        });

        if (!inPair) {
          return reject("You're not santa yet!");
        }

        const receiverData = await DatabaseClient.users.findFirst({
          where: {
            id: inPair.receiverId,
          },
        });

        resolve(receiverData!);
      } catch (err) {
        reject(err);
      }
    });
  }

  public getAll(count?: boolean) {
    return new Promise<Users[] | number>(async (resolve, reject) => {
      try {
        if (count) return resolve(await DatabaseClient.users.count());

        const users = await DatabaseClient.users.findMany();

        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new UserService();
