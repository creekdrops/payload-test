import { Block } from "payload/types";

const SectionHeader: Block = {
  slug: "section-header", // required
  //  imageURL: "https://google.com/path/to/image.jpg",
  // imageAltText: "A nice thumbnail image to show what this block looks like",
  interfaceName: "SectionHeader", // optional
  fields: [
    {
      type: "radio",
      name: "type",
      required: true,
      options: [
        { value: "default", label: "Default" },
        { value: "withDescription", label: "With Description" },
        { value: "withPrefix", label: "With Prefix" },
        {
          value: "withPrefixAndDescription",
          label: "With Prefix and Description",
        },
      ],
      admin: {
        layout: "horizontal",
      },
      defaultValue: "standard",
    },
    {
      name: "prefix",
      type: "text",
      admin: {
        condition: (_, siblingData) =>
          siblingData.type === "withPrefix" ||
          siblingData.type === "withPrefixAndDescription",
      },
    },
    {
      name: "header",
      type: "text",
      required: true,
    },
    {
      name: "quoteText",
      type: "text",
      admin: {
        condition: (_, siblingData) =>
          siblingData.type === "withDescription" ||
          siblingData.type === "withPrefixAndDescription",
      },
    },
  ],
};

export default SectionHeader;
