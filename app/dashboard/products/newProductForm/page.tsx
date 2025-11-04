import db from "@/app/lib/sqlite/db";
import NewProductForm from "./newProductForm";

export default function ProductForm() {
  const categoryRows = db.prepare("SELECT * FROM category").all();
  const imageRows = db.prepare(`SELECT * FROM images`).all();
  const seen = new Set<string>();
  const images = [];

  for (const row of imageRows) {
    const base64 = Buffer.from(row.image).toString("base64");
    const url = `data:${row.imageType};base64,${base64}`;

    if (!seen.has(url)) {
      seen.add(url);
      images.push({ id: row.id, url });
    }
  }
  return (
    <>
      <NewProductForm categoryRows={categoryRows} Images={images} />
    </>
  );
}
