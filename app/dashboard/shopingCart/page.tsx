import db from "@/app/lib/db/db";
import ShoppingCart from "./shopingCart";
import { cart, images, products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function ShoppingCartPage() {
  const cartItems = await db
    .select({
      id: cart.id,
      productId: cart.productId,
      quantity: cart.quantity,
      productName: products.name,
      price: products.price,
      image: images.image,
    })
    .from(cart)
    .leftJoin(products, eq(cart.productId, products.id))
    .leftJoin(images, eq(products.imageId, images.id));

  const cartWithImages = cartItems.map((item) => {
    const base64Image = item.image
      ? `data:image/jpeg;base64,${Buffer.from(
          item.image as Uint8Array
        ).toString("base64")}`
      : null;

    return {
      id: item.id,
      product_id: item.productId,
      quantity: item.quantity,
      product_name: item.productName,
      price: item.price,
      base64Image,
    };
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ShoppingCart cart={cartWithImages} />
    </div>
  );
}
