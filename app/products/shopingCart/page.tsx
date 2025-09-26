import db from "@/app/lib/sqlite/db";
import ShoppingCart from "./shopingCart";

interface RowType {
  [key: string]: any;
}

export default function ShopingCartPage(){
      const products = db
    .prepare(
      `SELECT * FROM products join images on products.image_id = images.id `
    )
    .all();
      const productsWithBase64Images =products.map((row:RowType) => {
    const base64Image = row.image.toString("base64");
    const { image, ...rest } = row;
    return {
      ...rest,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });
  
return(
    <div>
      <ShoppingCart products={productsWithBase64Images}/>
    </div>
)
}