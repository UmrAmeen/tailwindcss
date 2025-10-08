"use server";

import db from "@/app/lib/sqlite/db";

export async function addItem(cartId: number) {
  db.prepare("UPDATE cart SET quantity = quantity + 1 WHERE id = ?").run(
    cartId
  );
}

export async function subItem(cartId: number) {
  const current = db
    .prepare("SELECT quantity FROM cart WHERE id = ?")
    .get(cartId) as { quantity: number };
  if (current.quantity <= 1) {
    db.prepare("DELETE FROM cart WHERE id = ?").run(cartId);
  } else {
    db.prepare("UPDATE cart SET quantity = quantity - 1 WHERE id = ?").run(
      cartId
    );
  }
}

export async function removeItem(cartId: number) {
  db.prepare("DELETE FROM cart WHERE id = ?").run(cartId);
}

export async function buyCart(cart: any[]) {
  const insert = db.prepare(`
    INSERT INTO orders (product_id, quantity, total_price)
    VALUES (?, ?, ?)
  `);

  const insertItem = db.transaction((items: any[]) => {
    items.map((item) => insert.run(item.id, item.qty, item.price * item.qty));
  });

  insertItem(cart);
  db.prepare("DELETE FROM cart").run();
  return { success: true, message: "Items purchased successfully." };
}
