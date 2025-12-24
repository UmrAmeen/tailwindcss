CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"total_price" integer NOT NULL
);
