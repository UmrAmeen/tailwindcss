ALTER TABLE "images" RENAME COLUMN "imageType" TO "image_type";--> statement-breakpoint
ALTER TABLE "images" RENAME COLUMN "name" TO "image";--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "id" SET MAXVALUE 9223372036854775807;--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "quantity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "id" SET MAXVALUE 9223372036854775807;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET MAXVALUE 9223372036854775807;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET MAXVALUE 9223372036854775807;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category_id" bigint;--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "data";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "categoryId";