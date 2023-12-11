import { Field } from "payload/types";

export const backgroundColor: Field = {
  name: "backgroundColor",
  type: "select",
  defaultValue: "background",
  options: [
    { label: "Background", value: "background" },
    { label: "Accent", value: "accent" },
    { label: "Muted", value: "muted" },
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
  ],
};
