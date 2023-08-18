/*
  Warnings:

  - You are about to drop the column `authorId` on the `posts` table. All the data in the column will be lost.
  - Added the required column `userId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isPublish" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "userId" TEXT NOT NULL,
    "author" TEXT,
    "authorUrl" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("content", "createdAt", "id", "imageUrl", "isPublish", "title", "updatedAt", "views") SELECT "content", "createdAt", "id", "imageUrl", "isPublish", "title", "updatedAt", "views" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE UNIQUE INDEX "posts_imageUrl_key" ON "posts"("imageUrl");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
