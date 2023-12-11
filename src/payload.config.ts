import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { buildConfig } from "payload/config";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import Employees from "./collections/Employees";
import { Media } from "./collections/Media";
import Pages from "./collections/Pages";
import Services from "./collections/Services";
import Users from "./collections/Users";
import Navigation from "./globals/Navigation";
import Settings from "./globals/Settings";
import EmployeeOrder from "./globals/EmployeeOrder";
import PrivacyPolicy from "./globals/PrivacyPolicy";
import { PostCategories, ServiceCategories } from "./collections/Categories";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors: "*",
  editor: lexicalEditor({}),
  collections: [
    Users,
    Pages,
    Employees,
    Services,
    Media,
    PostCategories,
    ServiceCategories,
  ],
  globals: [Settings, Navigation, PrivacyPolicy, EmployeeOrder],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
