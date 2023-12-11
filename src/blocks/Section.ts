import { Block } from "payload/types";
import { backgroundColor } from "../fields/backgroundColor";
import Content from "./Content";
import Heading from "./Heading";

const Section: Block = {
  slug: "section", // required
  //  imageURL: "https://google.com/path/to/image.jpg",
  // imageAltText: "A nice thumbnail image to show what this block looks like",
  interfaceName: "Section", // optional
  fields: [
    {
      name: "sectionId",
      type: "text",
      required: true,
      label: "Section ID",
    },
    backgroundColor,
    {
      name: "content",
      type: "blocks",
      blocks: [Heading, Content],
    },
  ],
};

export default Section;
