import ShoppingCart from "./shopingCart";
import { eq } from "drizzle-orm";
import { db } from "@/app/lib/db/database";
import { cart, images, products } from "@/supabase/migrations/schema";
import { getUserIdFromCookie } from "@/app/lib/getUserId";

export default async function ShoppingCartPage() {
  const userId = await getUserIdFromCookie();

  if (!userId) {
    return (
      <p className="text-red-500 font-bold">Please log in to view your cart.</p>
    );
  }
  const cartItems = await db
    .select({
      id: cart.id,
      quantity: cart.quantity,
      productName: products.name,
      price: products.price,
      image: images.image,
    })
    .from(cart)
    .leftJoin(products, eq(cart.productId, products.id))
    .leftJoin(images, eq(products.imageId, images.id))
    .where(eq(cart.userId, userId))
    .execute();

  const cartWithImages = cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product_name: item.productName,
    price: item.price,
    base64Image: item.image
      ? `data:image/jpeg;base64,${Buffer.from(item.image).toString("base64")}`
      : null,
  }));

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ShoppingCart cart={cartWithImages} />
    </div>
  );
}
