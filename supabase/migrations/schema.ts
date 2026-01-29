import {
  pgTable,
  bigint,
  foreignKey,
  text,
  integer,
  customType,
  serial,
  numeric,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const cart = pgTable("cart", {
  id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
    name: "cart_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 10000,
    cache: 1,
  }),

  productId: bigint("product_id", { mode: "number" }).notNull(),

  quantity: bigint({ mode: "number" }),
  userId: uuid("userId").notNull(),
});

export const category = pgTable(
  "category",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "category_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 10000,
      cache: 1,
    }),
    name: text().notNull(),

    parentId: bigint("parent_id", { mode: "number" }),

    imageId: bigint("image_id", { mode: "number" }),
    slug: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.imageId],
      foreignColumns: [images.id],
      name: "category_image_fk",
    }),
  ],
);

export const products = pgTable("products", {
  id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
    name: "products_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 10000,
    cache: 1,
  }),
  name: text().notNull(),
  imageId: integer("image_id"),
  categoryId: integer(),
  price: numeric("price"),
  description: text(),
  slug: text(),
});

export const user = pgTable("user", {
  id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  auth_id: uuid("auth_id").unique(),
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
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: "images_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 100000,
      cache: 1,
    }),
  imageType: text("image_type").notNull(),
  image: bytea("image"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  totalPrice: integer("total_price").notNull(),
  userId: uuid("userId").notNull(),
});

export const checkoutSessions = pgTable("checkout_sessions", {
  id: serial("id").primaryKey(),
  userId: uuid("userId").notNull(),
  fullName: text("full_name").notNull(),
  address: text("address").notNull(),
  postcode: text("postcode").notNull(),
  phone: text("phone").notNull(),
  createdAt: integer("created_at").default(sql`EXTRACT(EPOCH FROM NOW())::int`),
});
