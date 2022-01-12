-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "wishes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UsersPair" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "santaId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL
);
