import { Block, Field } from "payload/types";
import { backgroundColor } from "../fields/backgroundColor";

const columnFields: Field[] = [
  {
    type: "richText",
    name: "content",
    label: "Content",
    required: true,
  },
];

export const Content: Block = {
  slug: "content", // required
  //  imageURL: "https://google.com/path/to/image.jpg",
  // imageAltText: "A nice thumbnail image to show what this block looks like",
  interfaceName: "ContentBlock", // optional
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "layout",
          type: "select",
          defaultValue: "oneColumn",
          options: [
            {
              label: "One Column",
              value: "oneColumn",
            },
            {
              label: "Two Thirds + One Third",
              value: "twoThirdsOneThird",
            },
            {
              label: "Half + Half",
              value: "halfAndHalf",
            },
            {
              label: "Three Columns",
              value: "threeColumns",
            },
            {
              label: "Four Columns",
              value: "fourColumns",
            },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "columnOne",
          type: "group",
          fields: columnFields,
        },
        {
          name: "columnTwo",
          type: "group",
          fields: columnFields,
          admin: {
            condition: (_, { layout }) =>
              [
                "twoThirdsOneThird",
                "halfAndHalf",
                "threeColumns",
                "fourColumns",
              ].includes(layout),
          },
        },
        {
          name: "columnThree",
          type: "group",
          fields: columnFields,
          admin: {
            condition: (_, { layout }) =>
              ["threeColumns", "fourColumns"].includes(layout),
          },
        },
        {
          name: "columnFour",
          type: "group",
          fields: columnFields,
          admin: {
            condition: (_, { layout }) => ["fourColumns"].includes(layout),
          },
        },
      ],
    },
  ],
};

export default Content;
