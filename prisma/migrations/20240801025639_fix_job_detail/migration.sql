/*
  Warnings:

  - You are about to drop the column `jobDetails` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "jobDetails",
ADD COLUMN     "jobDetail" TEXT;
