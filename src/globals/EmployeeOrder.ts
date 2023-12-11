import { GlobalConfig } from "payload/types";
import { useState, useEffect } from "react";
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
              name: "employeeOrder",
              type: "array",
              required: true,
              validate: (employees) => {
                const employeeIds = employees.map(
                  (employee: { employee: number }) => employee.employee
                );

                const hasDuplicates =
                  new Set(employeeIds).size !== employeeIds.length;
                if (hasDuplicates) {
                  return "Each employee can only be added once.";
                }

                return true;
              },
              fields: [
                {
                  name: "employee",
                  type: "relationship",
                  relationTo: "employees",
                  required: true,
                },
              ],
              admin: {
                components: {
                  RowLabel: ({ data, index = 0 }) => {
                    const [label, setLabel] = useState(
                      `Employee ${String(index).padStart(2, "0")}`
                    );

                    useEffect(() => {
                      if (data.employee) {
                        const url = `${process.env.PAYLOAD_PUBLIC_SITE_URL}${process.env.PAYLOAD_PUBLIC_API_ROUTE}/employees/${data.employee}`;
                        fetch(url).then(async (res) => {
                          const employee = await res.json();
                          setLabel(employee.name);
                        });
                      }
                    }, [data.employee]);

                    return label;
                  },
                },
              },
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
