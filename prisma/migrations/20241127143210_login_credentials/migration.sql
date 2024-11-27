/*
  Warnings:

  - You are about to drop the column `entityId` on the `Beach` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Municipality` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `municipalityId` to the `Beach` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Municipality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Municipality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Beach" DROP CONSTRAINT "Beach_entityId_fkey";

-- DropIndex
DROP INDEX "Beach_entityId_idx";

-- AlterTable
ALTER TABLE "Beach" DROP COLUMN "entityId",
ADD COLUMN     "municipalityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" VARCHAR(25) NOT NULL;

-- CreateIndex
CREATE INDEX "Beach_municipalityId_idx" ON "Beach"("municipalityId");

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_email_key" ON "Municipality"("email");

-- AddForeignKey
ALTER TABLE "Beach" ADD CONSTRAINT "Beach_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
