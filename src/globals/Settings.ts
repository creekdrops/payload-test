import { GlobalConfig } from "payload/types";
import { brand } from "../fields/brand";
import { isAdmin } from "../utils/accessControl";

const SiteSettings: GlobalConfig = {
  slug: "settings",
  label: "General Settings",
  admin: {
    group: "Site Settings",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          description: "general",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "siteName",
                  type: "text",
                  label: "Site Name",
                  required: true,
                },
                {
                  name: "email",
                  type: "text",
                  label: "Email",
                  required: true,
                },
              ],
            },
            {
              name: "description",
              type: "textarea",
              label: "Site Description",
              required: true,
            },
            {
              name: "socialLinks",
              type: "array",
              label: "Social Links",
              admin: {
                components: {
                  RowLabel: ({
                    data,
                    index,
                  }: {
                    data: any;
                    index?: number;
                  }) => {
                    return (
                      data?.link?.label ||
                      `Social Link ${
                        index !== undefined
                          ? String(index).padStart(2, "0")
                          : ""
                      }`
                    );
                  },
                },
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "platform",
                      type: "select",
                      label: "Platform",
                      required: true,
                      options: [
                        {
                          label: "Facebook",
                          value: "facebook",
                        },
                        {
                          label: "Instagram",
                          value: "instagram",
                        },
                        {
                          label: "Twitter",
                          value: "twitter",
                        },
                        {
                          label: "LinkedIn",
                          value: "linkedin",
                        },
                        {
                          label: "YouTube",
                          value: "youtube",
                        },
                      ],
                    },
                    {
                      name: "url",
                      type: "text",
                      label: "URL",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Brand",
          description: "brand",
          fields: [brand],
        },
      ],
    },
  ],

  access: {
    read: () => true,
    update: isAdmin,
  },
};

export default SiteSettings;
