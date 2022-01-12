import utils from "@Helpers/utils";
import { UsersPair } from "@prisma/client";
import ShuffleService from "@Services/ShuffleService";
import UserManager from "./UserManager";

class ShuffleManager {
  shuffle() {
    return new Promise<UsersPair[]>(async (resolve, reject) => {
      try {
        const allUsers = await UserManager.getUsers();
        let withoutSanta = [...allUsers];

        if (allUsers.length < 3) {
          return reject(
            "You can shuffle only if registered more then 2 users."
          );
        }

        for (const user of allUsers) {
          if (!withoutSanta.length) {
            const createdPairs = await ShuffleService.getAll();
            return resolve(createdPairs);
          }

          const randomUser = utils.randomElement(
            withoutSanta.filter(u => u.id != user.id)
          );

          await ShuffleService.createPair(user.id, randomUser.id);

          withoutSanta = withoutSanta.filter(u => u.id != randomUser.id);
        }

        const createdPairs = await ShuffleService.getAll();
        resolve(createdPairs);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new ShuffleManager();
