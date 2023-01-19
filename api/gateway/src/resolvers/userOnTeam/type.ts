import { TeamsUserRole } from "@generated/type-graphql";
import { Directive, Field, ID, InputType, ObjectType } from "type-graphql";
import { Teams } from "../teams/type";

@InputType()
export class AddTeamMembersInput {
	@Field((_) => [String])
	userIds: string[];
	@Field((_) => String)
	teamId: string;
}

@InputType()
export class UpdateUserOnTeamsInput {
	@Field((_) => TeamsUserRole, { nullable: true })
	role?: TeamsUserRole;
}

@InputType()
export class UserOnTeamWhereUniqueInput {
	@Field((_) => ID)
	teamId: string;
	@Field((_) => ID)
	userId: string;
}

@InputType()
export class RemoveProjectMemberInput {
	@Field((_) => ID)
	userId: string;
	@Field((_) => String)
	teamId: string;
}

@Directive(`@key(fields: "userId teamId")`)
@ObjectType()
export class UserOnTeam {
	@Field((_) => ID)
	userId: string;
	@Field((_) => ID)
	teamId: string;
	@Field((_) => Teams)
	team: Teams;
	@Field((_) => TeamsUserRole)
	role: keyof typeof TeamsUserRole;
	@Field()
	accessedAt: Date;
	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}