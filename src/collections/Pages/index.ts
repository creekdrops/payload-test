import { CollectionConfig } from "payload/types";
import { slug } from "../../fields/slug";
import {
  isAdmin,
  isAdminOrPublished,
  isEditor,
} from "../../utils/accessControl";
import Hero from "../../blocks/Hero";
import Section from "../../blocks/Section";

const Pages: CollectionConfig = {
  slug: "pages",
  fields: [
    slug(),
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [Hero, Section],
    },
  ],
  access: {
    read: isAdminOrPublished,
    create: isAdmin || isEditor,
    update: isAdmin || isEditor,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "title",
  },
  versions: {
    drafts: true,
  },
};

export default Pages;
