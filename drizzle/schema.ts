import { sqliteTable, AnySQLiteColumn, integer, blob, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

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
	slug: text(),
	description: text(),
});

export const category = sqliteTable("category", {
	id: integer().primaryKey(),
	name: text(),
	parentId: text("parent_id"),
	imageId: integer("image_id"),
	slug: text(),
});

export const orders = sqliteTable("orders", {
	id: integer().primaryKey(),
	productId: integer("product_id"),
	quantity: integer(),
	totalPrice: integer("total_price"),
});

export const cart = sqliteTable("cart", {
	id: integer().primaryKey(),
	productId: integer("product_id"),
	quantity: integer(),
});

export const login = sqliteTable("login", {
	name: text(),
	email: text(),
	password: text(),
});

export const user = sqliteTable("user", {
	name: text(),
	email: blob(),
	password: text(),
});

