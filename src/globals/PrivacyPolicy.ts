import { GlobalConfig } from "payload/types";
import { isAdmin } from "../utils/accessControl";

const PrivacyPolicy: GlobalConfig = {
  slug: "privacy-policy",
  label: "Privacy Policy",
  admin: {
    group: "Site Settings",
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      type: "text",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "richText",
      name: "privacyPolicy",
      label: "Privacy Policy",
      required: true,
    },
  ],
};

export default PrivacyPolicy;
