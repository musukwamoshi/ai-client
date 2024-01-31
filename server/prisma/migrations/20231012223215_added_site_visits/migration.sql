-- CreateTable
CREATE TABLE "PageVisits" (
    "id" SERIAL NOT NULL,
    "count" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageVisits_pkey" PRIMARY KEY ("id")
);
