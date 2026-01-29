ALTER TABLE "products" RENAME COLUMN "category_id" TO "categoryId";--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "id" SET MAXVALUE 10000;--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "id" SET MAXVALUE 10000;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET MAXVALUE 10000;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET MAXVALUE 10000;