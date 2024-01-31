/*
  Warnings:

  - You are about to drop the column `replyContentContent` on the `Reply` table. All the data in the column will be lost.
  - Made the column `content` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `commentContent` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `replyContent` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "commentContent" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "replyContentContent",
ADD COLUMN     "replyContent" TEXT NOT NULL;
