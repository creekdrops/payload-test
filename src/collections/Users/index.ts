import { CollectionConfig } from "payload/types";
import {
  isAdmin,
  isAdminFieldLevel,
  isAdminOrSelf,
} from "../../utils/accessControl";

type Role = "admin" | "editor" | "user";

export type User = {
  id: number;
  email: string;
  role: Role;
};

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "role",
      label: "Role",
      type: "select",
      saveToJWT: true,
      defaultValue: "user",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "User", value: "user" },
      ],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
};

export default Users;
