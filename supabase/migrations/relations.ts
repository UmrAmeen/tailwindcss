import { relations } from "drizzle-orm/relations";
import { images, category } from "./schema";

export const categoryRelations = relations(category, ({one}) => ({
	image: one(images, {
		fields: [category.imageId],
		references: [images.id]
	}),
}));

export const imagesRelations = relations(images, ({many}) => ({
	categories: many(category),
}));