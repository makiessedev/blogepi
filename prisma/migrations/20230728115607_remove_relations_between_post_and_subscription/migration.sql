/*
  Warnings:

  - You are about to drop the column `postId` on the `subscriptions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subscriptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "subscribedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_subscriptions" ("email", "id", "subscribedAt") SELECT "email", "id", "subscribedAt" FROM "subscriptions";
DROP TABLE "subscriptions";
ALTER TABLE "new_subscriptions" RENAME TO "subscriptions";
CREATE UNIQUE INDEX "subscriptions_email_key" ON "subscriptions"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
