import { CollectionConfig } from "payload/types";
import { slug } from "../../fields/slug";
import { isAdmin } from "../../utils/accessControl";
import { addToSortedHook, setCreatedByUserIdHook } from "./hooks";

const Employees: CollectionConfig = {
  slug: "employees",
  fields: [
    slug("name"),
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
        readOnly: true,
        condition: (data) => data.createdBy,
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "richText",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
  hooks: {
    beforeChange: [setCreatedByUserIdHook],
    afterChange: [addToSortedHook],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title"],
  },
  versions: {
    drafts: true,
  },
};

export default Employees;
