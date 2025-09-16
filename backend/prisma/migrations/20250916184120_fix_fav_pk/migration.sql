/*
  Warnings:

  - The primary key for the `Fav` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Fav" DROP CONSTRAINT "Fav_pkey",
ADD CONSTRAINT "Fav_pkey" PRIMARY KEY ("authorId", "postId");
