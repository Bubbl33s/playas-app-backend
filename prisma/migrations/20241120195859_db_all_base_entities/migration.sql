/*
  Warnings:

  - You are about to alter the column `name` on the `Restriction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Restriction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Restriction" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "image" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beach" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "isHealthy" BOOLEAN NOT NULL DEFAULT false,
    "tideStatus" VARCHAR(10) NOT NULL,
    "hasLifeguards" BOOLEAN NOT NULL DEFAULT false,
    "lifeguardSchedule" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeachRestriction" (
    "id" TEXT NOT NULL,
    "beachId" TEXT NOT NULL,
    "restrictionId" TEXT NOT NULL,
    "notes" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BeachRestriction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeachPhoto" (
    "id" TEXT NOT NULL,
    "beachId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BeachPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Municipality_district_idx" ON "Municipality"("district");

-- CreateIndex
CREATE INDEX "Beach_entityId_idx" ON "Beach"("entityId");

-- CreateIndex
CREATE INDEX "Beach_name_idx" ON "Beach"("name");

-- AddForeignKey
ALTER TABLE "Beach" ADD CONSTRAINT "Beach_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeachRestriction" ADD CONSTRAINT "BeachRestriction_beachId_fkey" FOREIGN KEY ("beachId") REFERENCES "Beach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeachRestriction" ADD CONSTRAINT "BeachRestriction_restrictionId_fkey" FOREIGN KEY ("restrictionId") REFERENCES "Restriction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeachPhoto" ADD CONSTRAINT "BeachPhoto_beachId_fkey" FOREIGN KEY ("beachId") REFERENCES "Beach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
