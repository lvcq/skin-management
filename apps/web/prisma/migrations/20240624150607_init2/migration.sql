-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ADMIN', 'NORMAL');

-- CreateEnum
CREATE TYPE "GroupStatus" AS ENUM ('InProgress', 'Complete');

-- CreateTable
CREATE TABLE "Account" (
    "id" VARCHAR(64) NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "type" "AccountType" NOT NULL DEFAULT 'NORMAL',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" VARCHAR(64) NOT NULL,
    "group_name" VARCHAR(32) NOT NULL,
    "status" "GroupStatus" NOT NULL DEFAULT 'InProgress',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Group_group_name_key" ON "Group"("group_name");
