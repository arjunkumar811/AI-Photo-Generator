/*
  Warnings:

  - The values [AsianAmerican,EastAsian,SouthEastAsian,SouthAsian,MiddleEastern] on the enum `EthnicityEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [lue,azel] on the enum `EyeColorEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EthnicityEnum_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'South Asian', 'Middle Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "Model" ALTER COLUMN "ethnicity" TYPE "EthnicityEnum_new" USING ("ethnicity"::text::"EthnicityEnum_new");
ALTER TYPE "EthnicityEnum" RENAME TO "EthnicityEnum_old";
ALTER TYPE "EthnicityEnum_new" RENAME TO "EthnicityEnum";
DROP TYPE "EthnicityEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EyeColorEnum_new" AS ENUM ('Brown', 'Blue', 'Hazel', 'Gray');
ALTER TABLE "Model" ALTER COLUMN "eyeColor" TYPE "EyeColorEnum_new" USING ("eyeColor"::text::"EyeColorEnum_new");
ALTER TYPE "EyeColorEnum" RENAME TO "EyeColorEnum_old";
ALTER TYPE "EyeColorEnum_new" RENAME TO "EyeColorEnum";
DROP TYPE "EyeColorEnum_old";
COMMIT;
