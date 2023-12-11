import { GlobalConfig } from "payload/types";
import { isAdmin } from "../utils/accessControl";
import { navLink } from "../fields/navLink";
import { link } from "../fields/link";

const MainNavigation: GlobalConfig = {
  slug: "navigation",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Main",
          fields: [{ name: "main", type: "array", fields: [navLink()] }],
        },
        {
          label: "Footer",
          fields: [
            {
              type: "array",
              name: "footer",
              fields: link,
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

export default MainNavigation;
