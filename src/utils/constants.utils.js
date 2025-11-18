export const userRolesEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};

export const availableUserRoles = Object.values(userRolesEnum);

export const taskStatusesEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const availableTaskStatuses = Object.values(taskStatusesEnum);
