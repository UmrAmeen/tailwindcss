import { db } from "@/app/lib/db/database";
import { cart, products } from "@/supabase/migrations/schema";
import { eq } from "drizzle-orm";
import { getUserIdFromCookie } from "@/app/lib/getUserId";

export default async function CartSummary() {
  const userId = await getUserIdFromCookie();

  if (!userId) {
    return null;
  }
  const cartItems = await db
    .select({
      id: cart.id,
      quantity: cart.quantity,
      name: products.name,
      price: products.price,
    })
    .from(cart)
    .leftJoin(products, eq(cart.productId, products.id))
    .where(eq(cart.userId, userId))
    .execute();

  const total = cartItems.reduce((sum, item) => {
    const quantity = item.quantity ?? 0;
    const price = Number(item.price ?? 0);
    return sum + price * quantity;
  }, 0);

  return (
    <div className="space-y-4 border rounded-md p-4 shadow-sm bg-gray-300">
      <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => {
            const quantity = item.quantity ?? 0;
            const price = Number(item.price ?? 0);

            return (
              <div key={item.id} className="flex justify-between text-gray-600">
                <span>
                  {item.name} × {quantity}
                </span>
                <span>${(price * quantity).toFixed(2)}</span>
              </div>
            );
          })}

          <hr />

          <div className="flex justify-between font-bold text-lg text-red-500">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}
