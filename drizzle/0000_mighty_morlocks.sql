-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `images` (
	`id` integer PRIMARY KEY,
	`image` blob,
	`imageType` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY,
	`name` text,
	`image_id` integer,
	`categoryId` integer,
	`price` integer,
	`slug` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` integer PRIMARY KEY,
	`name` text,
	`parent_id` text,
	`image_id` integer,
	`slug` text
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY,
	`product_id` integer,
	`quantity` integer,
	`total_price` integer
);
--> statement-breakpoint
CREATE TABLE `cart` (
	`id` integer PRIMARY KEY,
	`product_id` integer,
	`quantity` integer
);
--> statement-breakpoint
CREATE TABLE `login` (
	`name` text,
	`email` text,
	`password` text
);
--> statement-breakpoint
CREATE TABLE `user` (
	`name` text,
	`email` blob,
	`password` text
);

*/