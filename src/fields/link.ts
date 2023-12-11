import { Field } from "payload/types";

export const link: Field[] = [
  {
    name: "type",
    type: "radio",
    options: [
      { label: "Page", value: "page" },
      { label: "Custom URl", value: "custom" },
    ],
    admin: {
      layout: "horizontal",
    },
    defaultValue: "page",
  },
  {
    name: "label",
    label: "Label",
    type: "text",
    required: true,
  },
  {
    name: "page",
    label: "Page to link to",
    type: "relationship",
    relationTo: "pages",
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData.type === "page",
    },
  },
  {
    name: "url",
    label: "URL",
    type: "text",
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData.type === "custom",
    },
  },
];
