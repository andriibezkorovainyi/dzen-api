/*
  Warnings:

  - A unique constraint covering the columns `[commentId]` on the table `ServerResponseFilePayload` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_commentId_key" ON "File"("commentId");
