import { Field } from "payload/types";
import { link } from "./link";

export const navLink = (depth: number = 0, maxDepth: number = 2): Field => ({
  type: "group",
  name: "link",
  fields: [
    ...link,
    {
      name: "includeSubNav",
      type: "checkbox",
      label: "Include Sub Navigation",
      defaultValue: false,
      admin: {
        condition: () => depth < maxDepth,
      },
    },
    {
      name: "nav",
      label: "Sub Navigation",
      type: "array",
      fields: depth < maxDepth ? [navLink(depth + 1)] : [],
      admin: {
        condition: (_, siblingData) =>
          siblingData.includeSubNav && depth < maxDepth,
        components: {
          RowLabel: ({ data, index }: { data: any; index?: number }) => {
            return (
              data?.link?.label ||
              `Sublink ${
                index !== undefined ? String(index).padStart(2, "0") : ""
              }`
            );
          },
        },
      },
    },
  ],
});

// export const navLink = (
//   name: string,
//   depth: number = 0,
//   maxDepth: number = 2
// ): Field => ({
//   name: name,
//   type: "group",
//   fields: [
//     link,
//     {
//       name: "includeSubNav",
//       type: "checkbox",
//       label: "Include Sub Navigation",
//       defaultValue: false,
//       admin: {
//         condition: () => depth < maxDepth,
//       },
//     },
//     {
//       name: "nav",
//       label: "Sub Navigation",
//       type: "array",
//       fields: depth < maxDepth ? [navLink(name, depth + 1)] : [],
//       admin: {
//         condition: (_, siblingData) =>
//           siblingData.includeSubNav && depth < maxDepth,
//         components: {
//           RowLabel: ({ data, index }: { data: any; index?: number }) => {
//             return (
//               data?.link?.label ||
//               `Sublink ${
//                 index !== undefined ? String(index).padStart(2, "0") : ""
//               }`
//             );
//           },
//         },
//       },
//     },
//   ],
// });
