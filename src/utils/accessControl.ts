import { Access, FieldAccess } from "payload/types";
import type { User } from "../collections/Users";

export const isAdmin: Access = ({ req }) => isAdminUser(req.user);

export const isAdminOrEditor: Access = ({ req }) =>
  isAdminUser(req.user) || isEditorUser(req.user);

export const isAdminOrCreatedBy: Access = ({ req }) =>
  isAdminUser(req.user) || !!isCreatedByUser(req.user);

export const isAdminOrSelf: Access = ({ req }) =>
  isAdminUser(req.user) || !!isSelfUser(req.user);

export const isAdminOrPublished: Access = ({ req }) =>
  isAdminUser(req.user) || isPublished;

export const isEditor: Access = ({ req }) => isEditorUser(req.user);

export const isEditorOrCreatedBy = ({ req }) =>
  isEditorUser(req.user) || !!isCreatedByUser(req.user);

// Field level access control
export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
  req,
}) => isAdminUser(req.user);

// Access control helpers
const isPublished = {
  _status: {
    equals: "published",
  },
};

function isAdminUser(user?: User): boolean {
  return user?.role === "admin";
}

function isEditorUser(user?: User): boolean {
  return user?.role === "editor";
}

function isSelfUser(user?: User): Record<string, any> | false {
  if (user) {
    return {
      id: {
        equals: user?.id,
      },
    };
  }
  return false;
}

function isCreatedByUser(user?: User): Record<string, any> | false {
  if (user) {
    return {
      createdBy: {
        equals: user?.id,
      },
    };
  }
  return false;
}
