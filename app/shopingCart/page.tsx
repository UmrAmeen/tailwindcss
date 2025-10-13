import db from "@/app/lib/sqlite/db";
import ShoppingCart from "./shopingCart";

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
    .all();

  const cartWithImages = cartItems.map((item: any) => {
    const base64Image = Buffer.from(item.image).toString("base64"); 
    return {
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      product_name: item.product_name,
      price: item.price,
      base64Image: `data:image/jpeg;base64,${base64Image}`, 
    };
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ShoppingCart cart={cartWithImages} />
    </div>
  );
}
