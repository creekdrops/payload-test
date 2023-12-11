import { CollectionConfig } from "payload/types";
import Hero from "../../blocks/Hero";
import QuoteBlock from "../../blocks/QuoteBlock";
import { slug } from "../../fields/slug";
import { isAdmin } from "../../utils/accessControl";

const Services: CollectionConfig = {
  slug: "services",
  fields: [
    slug(),
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "text",
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [Hero, QuoteBlock],
    },
  ],
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "summary"],
  },
};

export default Services;
