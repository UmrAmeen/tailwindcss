import { sqliteTable, integer, text, blob } from "drizzle-orm/sqlite-core";


export const user = sqliteTable("user", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});


export const category = sqliteTable("category", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  parentId: integer("parent_id"),
  imageId: integer("image_id"),
  slug: text(),
});


export const images = sqliteTable("images", {
  id: integer().primaryKey().notNull(),
  image: blob(),
  imageType: text(),
});

export const products = sqliteTable("products", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  imageId: integer("image_id"),
  categoryId: integer("categoryId"),
  price: integer().notNull(),
  description: text(),
  slug: text(),
});


export const cart = sqliteTable("cart", {
  id: integer().primaryKey().notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer().notNull(),
});


export const orders = sqliteTable("orders", {
  id: integer().primaryKey().notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer().notNull(),
  totalPrice: integer("total_price").notNull(),
});
