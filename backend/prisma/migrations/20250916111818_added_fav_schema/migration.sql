-- CreateTable
CREATE TABLE "public"."Fav" (
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Fav_pkey" PRIMARY KEY ("authorId")
);

-- AddForeignKey
ALTER TABLE "public"."Fav" ADD CONSTRAINT "Fav_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fav" ADD CONSTRAINT "Fav_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
