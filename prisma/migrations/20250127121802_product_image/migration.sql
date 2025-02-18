-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "producId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_id_key" ON "ProductImage"("id");

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_producId_fkey" FOREIGN KEY ("producId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
