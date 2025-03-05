/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invite_token_key" ON "Invite"("token");
