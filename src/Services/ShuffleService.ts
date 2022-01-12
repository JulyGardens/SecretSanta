import { UsersPair } from "@prisma/client";
import DatabaseClient from "@Structure/DatabaseClient";

class ShuffleService {
  public createPair(santaId: number, receiverId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const createdPair = await DatabaseClient.usersPair.create({
          data: {
            receiverId,
            santaId,
          },
        });

        resolve(createdPair);
      } catch (err) {
        reject(err);
      }
    });
  }

  public getAll() {
    return new Promise<UsersPair[]>(async (resolve, reject) => {
      try {
        const allPairs = await DatabaseClient.usersPair.findMany();

        resolve(allPairs);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new ShuffleService();
