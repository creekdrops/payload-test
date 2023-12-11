import { Block } from "payload/types";
import { backgroundColor } from "../fields/backgroundColor";

const Hero: Block = {
  slug: "hero", // required
  // imageURL: "https://google.com/path/to/image.jpg",
  // imageAltText: "A nice thumbnail image to show what this block looks like",
  interfaceName: "HeroBlock", // optional
  fields: [
    {
      name: "type",
      type: "radio",
      required: true,
      options: [
        { value: "standard", label: "Standard" },
        { value: "large", label: "Large" },
      ],
      defaultValue: "standard",
      admin: {
        layout: "horizontal",
      },
    },
    backgroundColor,
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, siblingData) => siblingData.type === "large",
      },
    },
    {
      name: "content",
      type: "richText",
      admin: {
        condition: (_, siblingData) => siblingData.type === "large",
      },
    },
    {
      name: "callToActionLink",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData.type === "large",
      },
    },
  ],
};

export default Hero;
