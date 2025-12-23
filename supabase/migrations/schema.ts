import { pgTable, bigint, foreignKey, text, integer,customType } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const cart = pgTable("cart", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "cart_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 10000, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productId: bigint("product_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	quantity: bigint({ mode: "number" }),
});

export const category = pgTable("category", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "category_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 10000, cache: 1 }),
	name: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	parentId: bigint("parent_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	imageId: bigint("image_id", { mode: "number" }),
	slug: text(),
}, (table) => [
	foreignKey({
			columns: [table.imageId],
			foreignColumns: [images.id],
			name: "category_image_fk"
		}),
]);

export const products = pgTable("products", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "products_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 10000, cache: 1 }),
	name: text().notNull(),
	imageId: integer("image_id"),
	categoryId: integer(),
	price: text(),
	description: text(),
	slug: text(),
});

export const user = pgTable("user", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "user_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 10000, cache: 1 }),
	name: text().notNull(),
	email: text(),
	password: text(),
});



const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const images = pgTable("images", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  imageType: text("image_type").notNull(),
  image: bytea("image"),
});
