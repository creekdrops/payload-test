import { Field } from "payload/types";

export const brand: Field = {
  type: "group",
  name: "brand",
  label: "Brand",

  fields: [
    {
      type: "row",
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Logo",
          required: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "logoDark",
          type: "upload",
          relationTo: "media",
          label: "Logo (Dark Mode)",
          required: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          label: "Icon",
          required: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "iconDark",
          type: "upload",
          relationTo: "media",
          label: "Icon (Dark Mode)",
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
  ],
};
