/*
  Warnings:

  - Added the required column `user_id` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "user_id" VARCHAR(64) NOT NULL;
