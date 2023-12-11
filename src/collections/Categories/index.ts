import { CollectionConfig } from "payload/types";
import { isAdmin } from "../../utils/accessControl";

type Category = Omit<CollectionConfig, "slug">;

const BaseCategory: Category = {
  admin: {
    useAsTitle: "title",
    group: "Categories",
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
  ],
};

export const PostCategories: CollectionConfig = {
  slug: "post-categories",
  ...BaseCategory,
};

export const ServiceCategories: CollectionConfig = {
  slug: "service-categories",
  ...BaseCategory,
};
