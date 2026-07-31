/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ContactSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContactSubmission_email_key" ON "ContactSubmission"("email");
