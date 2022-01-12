import { PrismaClient } from "@prisma/client";

class DatabaseClient extends PrismaClient {}

export default new DatabaseClient();
