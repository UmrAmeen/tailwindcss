// app/cart/page.tsx
import db from "@/app/lib/sqlite/db";
import ShoppingCart from "./shopingCart";

interface RowType {
  [key: string]: any;
}

export default function ShoppingCartPage() {
  const cartItems = db
    .prepare(
      `SELECT 
        cart.id,
        cart.product_id,
        cart.quantity,
        products.name AS product_name,
        products.price,
        images.image
      FROM cart
      JOIN products ON cart.product_id = products.id
      JOIN images ON products.image_id = images.id`
    )
    .all() as RowType[];

  const cartWithImages = cartItems.map((item) => {
    const base64Image = item.image.toString("base64");
    const { image, ...rest } = item;
    return {
      ...rest,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ShoppingCart initialCart={cartWithImages} />
    </div>
  );
}
