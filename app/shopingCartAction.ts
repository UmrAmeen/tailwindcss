"use server";

import db from "@/app/lib/sqlite/db";
import { revalidatePath } from "next/cache";

const CART_PATH = "/shoppingCart";


export async function addItem(cartId: number) {
  db.prepare("UPDATE cart SET quantity = quantity + 1 WHERE id = ?").run(cartId);
  revalidatePath(CART_PATH);
}

export async function decreaseItem(cartId: number) {
  const { quantity } = db.prepare("SELECT quantity FROM cart WHERE id = ?").get(cartId);
  if (quantity > 1) {
    db.prepare("UPDATE cart SET quantity = quantity - 1 WHERE id = ?").run(cartId);
    revalidatePath(CART_PATH);
  }
}

export async function removeItem(cartId: number) {
  db.prepare("DELETE FROM cart WHERE id = ?").run(cartId);
  revalidatePath(CART_PATH);
}

export async function buyCart(cart: any[]) {
  const insert = db.prepare(`
    INSERT INTO orders (product_id, quantity, total_price)
    VALUES (?, ?, ?)
  `);

  const insertItem = db.transaction((items: any[]) => {
    for (const item of items) {
      insert.run(item.id, item.quantity, item.price * item.quantity);
    }
  });

  insertItem(cart);
  db.prepare("DELETE FROM cart").run();
  revalidatePath(CART_PATH);

  return { success: true, message: "Items purchased successfully." };
}
