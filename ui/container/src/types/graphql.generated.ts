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
  /** Create new user details of a user */
  createUser: User;
  /** Login with credentials */
  login: AuthPayload;
  /** Safety measure to close current session */
  logout: User;
  /** Request tokens renewal with existing cookie */
  refreshToken: AuthPayload;
  /** Update details of a user (admin only) */
  updateUser: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  where: UserWhereUniqueInput;
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

export type UpdateUserInput = {
  role?: InputMaybe<UserRole>;
  status?: InputMaybe<UserStatus>;
};

export type User = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  role: UserRole;
  status: UserStatus;
  updatedAt: Scalars['DateTime'];
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

export type UserFieldsFragment = { id: string, email: string, firstname: string, lastname: string, role: UserRole };

export type UserSingleFieldsFragment = { id: string, email: string, firstname: string, lastname: string, role: UserRole, status: UserStatus };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { token: string, user: { id: string, email: string, firstname: string, lastname: string, role: UserRole } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: { id: string, email: string, firstname: string, lastname: string, role: UserRole } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { refreshToken: { token: string, user: { id: string, email: string, firstname: string, lastname: string, role: UserRole } } };
