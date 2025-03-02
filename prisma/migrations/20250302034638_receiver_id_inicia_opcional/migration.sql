-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_receiverId_fkey";

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "receiverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
