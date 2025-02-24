export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AddTeamMembersInput = {
  teamId: Scalars['String']['input'];
  userIds: Array<Scalars['String']['input']>;
};

export type AuthPayload = {
  token: Scalars['String']['output'];
  user: User;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
  status?: InputMaybe<UserStatus>;
  teamId: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  /** Return self information */
  users: Array<User>;
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
  accessList: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  status: TeamStatus;
  thumb?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum TeamsUserRole {
  CONSUMER = 'CONSUMER',
  HEAD = 'HEAD'
}

export type TeamsWhereUniqueInput = {
  id: Scalars['ID']['input'];
};

export type UpdateUserInput = {
  role?: InputMaybe<UserRole>;
  status?: InputMaybe<UserStatus>;
};

export type UpdateUserOnTeamsInput = {
  role?: InputMaybe<TeamsUserRole>;
};

export type User = {
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserOnTeam = {
  accessedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  role: TeamsUserRole;
  team: Teams;
  teamId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type UserOnTeamWhereUniqueInput = {
  teamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
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
  id: Scalars['ID']['input'];
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
