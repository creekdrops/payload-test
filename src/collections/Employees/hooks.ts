import {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
} from "payload/types";

export const addToSortedHook: CollectionAfterChangeHook = async ({
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

export const setCreatedByUserIdHook: CollectionBeforeChangeHook = ({
  req,
  operation,
  data,
}) => {
  if (operation === "create") {
    if (req.user) {
      data.createdBy = req.user.id;
      return data;
    }
  }
};
