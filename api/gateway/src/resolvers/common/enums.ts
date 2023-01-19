import * as prismaClient from "@prisma/client";
import { registerEnumType } from "type-graphql";

export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export type FeedbackType = prismaClient.FeedbackType;
export type NotificationType = prismaClient.NotificationType;
export type UserStatus = prismaClient.UserStatus;
export type UserRole = prismaClient.UserRole;
export enum ProjectPermissionType {
	ANY = "ANY",
	OWN = "OWN",
}

registerEnumType(ProjectPermissionType, {
	name: "ProjectPermissionType",
	description: "Type of project permission",
});
registerEnumType(prismaClient.FeedbackType, {
	name: "FeedbackType",
	description: "Kind of user feedback",
});
registerEnumType(prismaClient.NotificationType, {
	name: "NotificationType",
	description: "Kind of notification for user",
});

registerEnumType(prismaClient.UserStatus, {
	name: "UserStatus",
	description: "Activeness state of a user",
});
registerEnumType(prismaClient.UserRole, {
	name: "UserRole",
	description: "User role options",
});
registerEnumType(SortOrder, {
	name: "SortOrder",
});
