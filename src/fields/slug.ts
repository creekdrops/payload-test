import { Field } from "payload/types";
import { formatSlug } from "../utils/formatSlug";

export const slug = (fallback: string = "title"): Field => ({
  name: "slug",
  type: "text",
  unique: true,
  admin: {
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [formatSlug(fallback)],
  },
});
