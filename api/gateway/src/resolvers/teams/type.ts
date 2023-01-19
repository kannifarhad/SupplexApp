import {
	TeamStatus
} from "@generated/type-graphql";
import { JSONResolver } from "graphql-scalars";
import PrismaTypes from "@prisma/client";
import {
	ArgsType,
	Directive,
	Field,
	ID,
	InputType,
	ObjectType,
} from "type-graphql";
import { ConnectionArgs, ConnectionType, EdgeType } from "../common/relay";

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Teams {
	@Field((_) => ID)
	id: string;
	@Field((_) => String)
	organizationId: string;
	@Field((_) => TeamStatus)
	status: PrismaTypes.TeamStatus;
	@Field((_) => String)
	name: string;
	@Field((_) => JSONResolver)
	accessList: any;
	@Field((_) => String, {nullable: true})
	description: string | null;
	@Field((_) => String, {nullable: true})
	thumb: string | null;
	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
	@Field()
	endDate: Date;
}

@InputType()
export class TeamsWhereUniqueInput {
	@Field((_) => ID)
	id: string;
}

@InputType()
export class RequestTeamsAccessInput {
	@Field((_) => ID)
	teamId: string;
	@Field((_) => String)
	reason: string;
}

@InputType()
export class TeamsWhereInput {
	@Field((_) => String, { nullable: true})
	name?: string;
}

@InputType()
export class CreateTeamsInput {
	@Field((_) => TeamStatus)
	status: PrismaTypes.TeamStatus;
	@Field((_) => String)
	name: string;
	@Field((_) => JSON)
	accessList: any;
	@Field((_) => String, {nullable: true})
	description: string | null;
	@Field((_) => String, {nullable: true})
	thumb: string | null;
}

@InputType()
export class UpdateTeamsInput {
	@Field((_) => TeamStatus)
	status: PrismaTypes.TeamStatus;
	@Field((_) => String)
	name: string;
	@Field((_) => JSON)
	accessList: any;
	@Field((_) => String, {nullable: true})
	description: string | null;
	@Field((_) => String, {nullable: true})
	thumb: string | null;
}

@ObjectType()
export class TeamsEdge extends EdgeType("teams", Teams) {}

@ObjectType()
export class TeamsConnection extends ConnectionType<TeamsEdge>(
	"teams",
	TeamsEdge
) {}

@ArgsType()
export class TeamsConnectionArgs extends ConnectionArgs {
	@Field({ nullable: true })
	where?: TeamsWhereInput;
}