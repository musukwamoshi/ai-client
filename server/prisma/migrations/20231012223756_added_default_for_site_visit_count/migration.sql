/*
  Warnings:

  - You are about to drop the `PageVisits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PageVisits";

-- CreateTable
CREATE TABLE "SiteVisits" (
    "id" SERIAL NOT NULL,
    "count" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteVisits_pkey" PRIMARY KEY ("id")
);
