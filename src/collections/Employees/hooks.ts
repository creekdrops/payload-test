import {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
} from "payload/types";

export const addToSortedHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Only run this hook when creating a new employee
  if (operation === "create" && doc) {
    try {
      const { id } = doc;

      const employeeId = parseInt(id);

      const { employeeOrder } = await req.payload.findGlobal({
        slug: "sorting",
        depth: 0,
      });

      // BUG: It currently appears that the employees table has not been updated with
      // the new employee record at the time this hooks is run.

      await req.payload.updateGlobal({
        slug: "sorting",
        data: {
          employeeOrder: [...employeeOrder, employeeId],
        },
        overrideAccess: true,
      });
    } catch (error) {
      console.log(error);
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
