/*
  Warnings:

  - You are about to drop the column `frontend_id` on the `persons` table. All the data in the column will be lost.
  - You are about to drop the `passwords` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[passwordId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "users"."users" DROP CONSTRAINT "users_passwordId_fkey";

-- AlterTable
ALTER TABLE "users"."persons" DROP COLUMN "frontend_id";

-- DropTable
DROP TABLE "users"."passwords";

-- CreateTable
CREATE TABLE "users"."password" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_passwordId_key" ON "users"."users"("passwordId");

-- CreateIndex
CREATE UNIQUE INDEX "users_personId_key" ON "users"."users"("personId");

-- AddForeignKey
ALTER TABLE "users"."users" ADD CONSTRAINT "users_passwordId_fkey" FOREIGN KEY ("passwordId") REFERENCES "users"."password"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
