export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type AddTeamMembersInput = {
  teamId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type AuthPayload = {
  token: Scalars['String'];
  user: User;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  role?: InputMaybe<UserRole>;
  status?: InputMaybe<UserStatus>;
  teamId: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  /** Add an existing Organization users to the team */
  addTeamMembers: Array<UserOnTeam>;
  /** Create new user details of a user */
  createUser: User;
  /** Remove a user from an existing team */
  deleteTeamMember: UserOnTeam;
  /** Login with credentials */
  login: AuthPayload;
  /** Safety measure to close current session */
  logout: User;
  /** Request tokens renewal with existing cookie */
  refreshToken: AuthPayload;
  /** Update details of a user (admin only) */
  updateUser: User;
  updateUserOnTeam: UserOnTeam;
};


export type MutationAddTeamMembersArgs = {
  input: AddTeamMembersInput;
  where: TeamsWhereUniqueInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteTeamMemberArgs = {
  where: UserOnTeamWhereUniqueInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserOnTeamArgs = {
  input: UpdateUserOnTeamsInput;
  where: UserOnTeamWhereUniqueInput;
};

export type Query = {
  /** Return self information */
  me: User;
  /** Return user information */
  user: User;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export enum TeamStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

export type Teams = {
  accessList: Scalars['JSON'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  organizationId: Scalars['String'];
  status: TeamStatus;
  thumb?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export enum TeamsUserRole {
  CONSUMER = 'CONSUMER',
  HEAD = 'HEAD'
}

export type TeamsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type UpdateUserInput = {
  role?: InputMaybe<UserRole>;
  status?: InputMaybe<UserStatus>;
};

export type UpdateUserOnTeamsInput = {
  role?: InputMaybe<TeamsUserRole>;
};

export type User = {
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
  updatedAt: Scalars['DateTime'];
};

export type UserOnTeam = {
  accessedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  role: TeamsUserRole;
  team: Teams;
  teamId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['ID'];
};

export type UserOnTeamWhereUniqueInput = {
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
};

export enum UserRole {
  ADMIN = 'ADMIN',
  ANALYST = 'ANALYST',
  CONSUMER = 'CONSUMER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

export type UserWhereUniqueInput = {
  id: Scalars['ID'];
};

export type UserFieldsFragment = { id: string, email: string, firstname: string, photo?: string | null, lastname: string, role: UserRole };

export type UserSingleFieldsFragment = { id: string, email: string, firstname: string, lastname: string, photo?: string | null, address?: string | null, location?: string | null, phone?: string | null, role: UserRole, status: UserStatus };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { token: string, user: { id: string, email: string, firstname: string, photo?: string | null, lastname: string, role: UserRole } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: { id: string, email: string, firstname: string, photo?: string | null, lastname: string, role: UserRole } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { refreshToken: { token: string, user: { id: string, email: string, firstname: string, photo?: string | null, lastname: string, role: UserRole } } };
