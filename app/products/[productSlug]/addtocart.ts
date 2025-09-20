"use server";

import db from "@/app/lib/sqlite/db";

export async function addToCart(productId: number, quantity: number) {
  const existingItem = db
    .prepare("SELECT * FROM cart WHERE product_id = ?")
    .get(productId);

  if (existingItem) {
    db.prepare("UPDATE cart SET quantity = ? WHERE product_id = ?").run(
      quantity,
      productId
    );
  } else {
    db.prepare("INSERT INTO cart (product_id, quantity) VALUES (?, ?)").run(
      productId,
      quantity
    );
  }

  return { success: true };
}

export async function getCartQuantity(productId: number) {
  const item = db
    .prepare("SELECT quantity FROM cart WHERE product_id = ?")
    .get(productId);

  return item ? item.quantity : 0;
}
