import { Field } from "payload/types";
import { link } from "./link";

export const card: Field = {
  name: "card",
  type: "array",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "text",
      required: true,
    },
    link,
  ],
};
