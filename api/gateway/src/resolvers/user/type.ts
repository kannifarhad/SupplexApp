import { UserRole, UserStatus } from "@generated/type-graphql";
import {
	ArgsType,
	Directive,
	Field,
	ID,
	InputType,
	ObjectType
} from "type-graphql";
import { Context } from "../../context";
import { ConnectionArgs, ConnectionType, EdgeType } from "../common/relay";

@Directive(`@key(fields: "id")`)
@ObjectType()
export class User {
	@Field((_) => ID)
	id: string;
	@Field((_) => String)
	email: string;
	@Field((_) => String)
	firstname: string;
	@Field((_) => String)
	lastname: string;
	
	@Field((_) => String, {nullable: true})
	photo?: string;
	@Field((_) => String, {nullable: true})
	phone?: string;
	@Field((_) => String, {nullable: true})
	address?: string;
	@Field((_) => String, {nullable: true})
	location?: string;

	@Field((_) => UserRole)
	role: keyof typeof UserRole;
	@Field((_) => UserStatus)
	status: keyof typeof UserStatus;
	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}

@InputType()
export class LoginInput {
	@Field((_) => String)
	email: string;
	@Field((_) => String)
	password: string;
}

@InputType()
export class UpdateUserInput {
	@Field((_) => UserRole, { nullable: true })
	role?: keyof typeof UserRole;
	@Field((_) => UserStatus, { nullable: true })
	status?: keyof typeof UserStatus;
}

@InputType()
export class CreateUserInput {
	@Field((_) => UserRole, { nullable: true })
	role?: keyof typeof UserRole;
	@Field((_) => UserStatus, { nullable: true })
	status?: keyof typeof UserStatus;
	@Field((_) => String)
	teamId: string;
	@Field((_) => String)
	email: string;
	@Field((_) => String)
	firstname: string;
	@Field((_) => String)
	lastname: string;
}

@InputType()
export class UpdateUserPasswordInput {
	@Field((_) => String)
	previousPassword: string;
	@Field((_) => String)
	password: string;
}

@InputType()
export class SetUserDefaultProjectInput {
	@Field((_) => ID, { description: "Id of default project" })
	projectId: string;
}

@InputType()
export class UserWhereUniqueInput {
	@Field((_) => ID)
	id: string;
}

@InputType()
export class UserWhereInput {
	@Field((_) => [ID], { nullable: true, description: "Get users by their IDs" })
	id?: string[];
	@Field((_) => String, { nullable: true, description: "Users list by email" })
	email?: string;
	@Field((_) => ID, { nullable: true, description: "Users list by project" })
	projectId?: string;
	@Field((_) => [UserRole], { nullable: true, description: "Multiple filter by users roles" })
	roles?: UserRole[];
	@Field((_) => [UserStatus], { nullable: true, description: "Multiple filter by users statuses." })
	statuses?: UserStatus[];
}

@ObjectType()
export class AuthPayload {
	@Field((_) => String)
	token: string;
	@Field((_) => User)
	user: User;
}

@ObjectType()
export class UserEdge extends EdgeType("user", User) {}

@ObjectType()
export class UserConnection extends ConnectionType<UserEdge>(
	"user",
	UserEdge
) {}

@ArgsType()
export class UserConnectionArgs extends ConnectionArgs {
	@Field()
	where: UserWhereInput;
}


