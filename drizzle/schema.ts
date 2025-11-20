import { sqliteTable, AnySQLiteColumn, integer, text, blob } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const category = sqliteTable("category", {
	id: integer().primaryKey().notNull(),
	name: text().notNull(),
	parentId: text("parent_id"),
	imageId: text("image_id").notNull(),
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
	categoryId: integer(),
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
	id: integer(),
	name: text(),
	email: text(),
	password: text(),
});

export const drizzle = sqliteTable("drizzle", {
	id: integer(),
	name: text(),
});

