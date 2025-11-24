import { sqliteTable, integer, text, blob } from "drizzle-orm/sqlite-core";

// Users
export const user = sqliteTable("user", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

// Categories
export const category = sqliteTable("category", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  parentId: integer("parent_id"),
  imageId: integer("image_id"),
  slug: text(),
});

// Images
export const images = sqliteTable("images", {
  id: integer().primaryKey().notNull(),
  image: blob(),
  imageType: text(),
});

// Products
export const products = sqliteTable("products", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  imageId: integer("image_id"),
  categoryId: integer("category_id"),
  price: integer().notNull(),
  description: text(),
  slug: text(),
});

// Cart
export const cart = sqliteTable("cart", {
  id: integer().primaryKey().notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer().notNull(),
});

// Orders
export const orders = sqliteTable("orders", {
  id: integer().primaryKey().notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer().notNull(),
  totalPrice: integer("total_price").notNull(),
});
