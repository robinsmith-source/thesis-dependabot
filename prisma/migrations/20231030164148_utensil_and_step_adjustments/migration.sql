/*
  Warnings:

  - The `requiredUtensils` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `RecipeStep` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RecipeStep` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "requiredUtensils",
ADD COLUMN     "requiredUtensils" TEXT[];

-- AlterTable
ALTER TABLE "RecipeStep" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
