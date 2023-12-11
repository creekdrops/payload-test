import { GlobalConfig } from "payload/types";
import { isAdmin } from "../utils/accessControl";

const Sorting: GlobalConfig = {
  slug: "sorting",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Employees",
          fields: [
            {
              type: "relationship",
              relationTo: "employees",
              name: "employeeOrder",
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Site Settings",
  },
};

export default Sorting;
