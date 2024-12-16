/*
  Warnings:

  - You are about to drop the column `district` on the `Municipality` table. All the data in the column will be lost.
  - You are about to drop the `BeachPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BeachRestriction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `beachId` to the `Restriction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BeachPhoto" DROP CONSTRAINT "BeachPhoto_beachId_fkey";

-- DropForeignKey
ALTER TABLE "BeachRestriction" DROP CONSTRAINT "BeachRestriction_beachId_fkey";

-- DropForeignKey
ALTER TABLE "BeachRestriction" DROP CONSTRAINT "BeachRestriction_restrictionId_fkey";

-- DropIndex
DROP INDEX "Municipality_district_idx";

-- AlterTable
ALTER TABLE "Beach" ADD COLUMN     "hasRestrooms" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasShowers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "restroomSchedule" VARCHAR(50),
ADD COLUMN     "showerSchedule" VARCHAR(50),
ALTER COLUMN "lifeguardSchedule" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Municipality" DROP COLUMN "district",
ADD COLUMN     "phrase" VARCHAR(50),
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Restriction" ADD COLUMN     "beachId" TEXT NOT NULL;

-- DropTable
DROP TABLE "BeachPhoto";

-- DropTable
DROP TABLE "BeachRestriction";

-- CreateIndex
CREATE INDEX "Municipality_province_idx" ON "Municipality"("province");

-- CreateIndex
CREATE INDEX "Municipality_department_idx" ON "Municipality"("department");

-- AddForeignKey
ALTER TABLE "Restriction" ADD CONSTRAINT "Restriction_beachId_fkey" FOREIGN KEY ("beachId") REFERENCES "Beach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
