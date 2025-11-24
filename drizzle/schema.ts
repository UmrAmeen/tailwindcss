import {
  sqliteTable,
  AnySQLiteColumn,
  integer,
  text,
  blob,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const category = sqliteTable("category", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  parentId: text("parent_id"),
  imageId: text("image_id"), 
  slug: text(),
});


export const images = sqliteTable("images", {
  id: integer().primaryKey(),
  image: blob(),
  imageType: text(),
});

export const products = sqliteTable("products", {
  id: integer().primaryKey(),
  name: text(),
  imageId: integer("image_id"),
  categoryId: integer("category_id"),
  price: integer(),
  description: text(),
  slug: text(),
});

export const cart = sqliteTable("cart", {
  id: integer().primaryKey(),
  productId: integer("product_id"),
  quantity: integer(),
});

export const orders = sqliteTable("orders", {
  id: integer().primaryKey(),
  productId: integer("product_id"),
  quantity: integer(),
  totalPrice: integer("total_price"),
});

export const user = sqliteTable("user", {
  id: integer().primaryKey().notNull(), // primary key added
  name: text().notNull(),
  email: text().notNull(),
  password: text().notNull(),
});
export const drizzle = sqliteTable("drizzle", {
  id: integer(),
  name: text(),
});
