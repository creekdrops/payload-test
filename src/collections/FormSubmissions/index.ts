import { CollectionConfig } from "payload/types";
import { isAdmin } from "../../utils/accessControl";

const Pages: CollectionConfig = {
  slug: "form-submissions",
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "lastName",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "company",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "jobTitle",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "phone",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "email",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "message",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "source",
      type: "text",
      label: "Source",
      defaultValue: "Website",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
  access: {
    create: () => true,
    update: () => false,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "title",
  },
};

export default Pages;
