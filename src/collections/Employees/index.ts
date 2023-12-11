import { CollectionAfterChangeHook, CollectionConfig } from "payload/types";
import { slug } from "../../fields/slug";
import { isAdmin } from "../../utils/accessControl";

const addToSortedHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === "create" || (operation === "update" && doc)) {
    const { id } = doc;

    const employeeId = parseInt(id);

    const { employeeOrder } = await req.payload.findGlobal({
      slug: "sorting",
      depth: 0,
    });
    if (
      !employeeOrder.some(
        (item) =>
          typeof item.employee === "number" && item.employee === employeeId
      )
    ) {
      console.log("Adding employee to sort order...");
      await req.payload.updateGlobal({
        slug: "sorting",
        data: {
          employeeOrder: [...employeeOrder, { employee: employeeId }],
        },
        overrideAccess: true,
      });
      console.log("Employee added");
    }
  }
};

const Employees: CollectionConfig = {
  slug: "employees",
  fields: [
    slug("name"),
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
        readOnly: true,
        condition: (data) => data.createdBy,
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "richText",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === "create") {
          if (req.user) {
            data.createdBy = req.user.id;
            return data;
          }
        }
      },
    ],

    afterChange: [addToSortedHook],

    // afterDelete: async ({ doc }) => [
    //   {
    //     if(doc) {
    //       const { id } = doc;
    //
    //       // Get the current sorting order
    //       const sortingGlobal = await payload.findGlobal({
    //         slug: "sorting",
    //       });
    //
    //       // Remove the deleted employee's ID from the sorting order
    //       const updatedOrder = sortingGlobal.employeeOrder.filter(
    //         (e) => e.employee !== id
    //       );
    //       await payload.updateGlobal({
    //         slug: "sorting",
    //         data: { employeeOrder: updatedOrder },
    //       });
    //     },
    //   },
    // ],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title"],
  },
  versions: {
    drafts: true,
  },
};

export default Employees;
