import banner from "@/sanity/schema/banner";
import category from "@/sanity/schema/category";
import product from "@/sanity/schema/product";
import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banner, category, product],
};
