import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type AddTagInput = {
  id: Scalars['Int'];
  tag: Scalars['Int'];
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type ConnectTagInput = {
  id: Scalars['Int'];
  expenses: ExpensesWhereUniqueInput;
};

export type ConnectTagsToExpenseInput = {
  id: Scalars['Int'];
  tags: TagsWhereUniqueInput;
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  message: Scalars['String'];
  createdAt: Scalars['DateTime'];
  likes: Array<Scalars['String']>;
};

export type CreateContactInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  message: Scalars['String'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float'];
  user: Scalars['String'];
  expenseType: ExpenseTypeWhereUniqueInput;
  tags?: Maybe<TagsWhereUniqueInput>;
};

export type CreateExpenseTypeInput = {
  description: Scalars['String'];
  newName: Scalars['String'];
  user: Scalars['String'];
};

export type CreatePostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  createAt: Scalars['DateTime'];
};

export type CreateTagInput = {
  tagName: Scalars['String'];
  expenseType: ExpenseTypeWhereUniqueInput;
};



export type DeleteContactInput = {
  id: Scalars['Int'];
};

export type DeleteExpenseTypeInput = {
  id: Scalars['Int'];
};

export type Expense = {
  __typename?: 'Expense';
  id: Scalars['Int'];
  amount: Scalars['Float'];
  user: Scalars['String'];
  createdAt: Scalars['Date'];
  expenseType: ExpenseType;
  tags: Array<Tag>;
};

export type ExpensePage = {
  __typename?: 'ExpensePage';
  myExpenses: Array<Expense>;
  count: Scalars['Int'];
};

export type ExpenseType = {
  __typename?: 'ExpenseType';
  id: Scalars['Int'];
  description: Scalars['String'];
  newName: Scalars['String'];
  user: Scalars['String'];
  expenses: Array<Expense>;
  tags: Array<Tag>;
};

export type ExpenseTypeWhereUniqueInput = {
  id: Scalars['Int'];
};

export type ExpensesDetail = {
  __typename?: 'ExpensesDetail';
  expenses: Array<Expense>;
  count: Scalars['Int'];
};

export type ExpensesWhereUniqueInput = {
  ids: Array<Maybe<Scalars['Int']>>;
};



export type LikeContactInput = {
  id: Scalars['Int'];
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTag: Expense;
  connectTag: Tag;
  connectTagsToExpense: Expense;
  createContact?: Maybe<Contact>;
  createExpense: Expense;
  createExpenseType?: Maybe<ExpenseType>;
  createPost: Post;
  createTag: Tag;
  deleteContact?: Maybe<Contact>;
  deleteExpense: Expense;
  deleteExpenseType?: Maybe<ExpenseType>;
  deletePost: Post;
  deleteTags: BatchPayload;
  likeContact?: Maybe<Contact>;
  updateExpense: Expense;
  updateExpenseType?: Maybe<ExpenseType>;
  updatePost: Post;
};


export type MutationAddTagArgs = {
  input: AddTagInput;
};


export type MutationConnectTagArgs = {
  input: ConnectTagInput;
};


export type MutationConnectTagsToExpenseArgs = {
  input: ConnectTagsToExpenseInput;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateExpenseArgs = {
  input: CreateExpenseInput;
};


export type MutationCreateExpenseTypeArgs = {
  input?: Maybe<CreateExpenseTypeInput>;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationDeleteContactArgs = {
  input: DeleteContactInput;
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteExpenseTypeArgs = {
  input?: Maybe<DeleteExpenseTypeInput>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTagsArgs = {
  input: TagWhereInput;
};


export type MutationLikeContactArgs = {
  input?: Maybe<LikeContactInput>;
};


export type MutationUpdateExpenseArgs = {
  input: UpdateExpenseInput;
};


export type MutationUpdateExpenseTypeArgs = {
  input?: Maybe<UpdateExpenseTypeInput>;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  input: UpdatePostInput;
};

export type OneContactInput = {
  id: Scalars['Int'];
};

export type OneUserAllExpenseInput = {
  user: Scalars['String'];
  maxDate?: Maybe<Scalars['Date']>;
  mindDate?: Maybe<Scalars['Date']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  body: Scalars['String'];
  createAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  contacts: Array<Contact>;
  expense?: Maybe<Expense>;
  expenseByCategory: Scalars['JSON'];
  expenseByType: Scalars['JSON'];
  expenseCount: Scalars['Int'];
  expensePage?: Maybe<ExpensePage>;
  expenseTypes: Array<ExpenseType>;
  expenses: Array<Expense>;
  myContacts: Array<Contact>;
  myExpenses: Array<Expense>;
  oneContact?: Maybe<Contact>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  queryOneTypeAllExpenses?: Maybe<ExpensesDetail>;
  redwood?: Maybe<Redwood>;
  searchMessage: Array<Contact>;
  userExpensesSum: Scalars['Float'];
  userTypes: Array<ExpenseType>;
};


export type QueryExpenseArgs = {
  id: Scalars['Int'];
};


export type QueryExpenseByCategoryArgs = {
  user: Scalars['String'];
  maxDate?: Maybe<Scalars['Date']>;
  minDate?: Maybe<Scalars['Date']>;
  chosenTagIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryExpenseByTypeArgs = {
  user: Scalars['String'];
  maxDate?: Maybe<Scalars['Date']>;
  minDate?: Maybe<Scalars['Date']>;
  chosenTagIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryExpenseCountArgs = {
  user: Scalars['String'];
};


export type QueryExpensePageArgs = {
  page?: Maybe<Scalars['Int']>;
  user: Scalars['String'];
};


export type QueryMyContactsArgs = {
  email: Scalars['String'];
};


export type QueryMyExpensesArgs = {
  input: Scalars['String'];
};


export type QueryOneContactArgs = {
  input: OneContactInput;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryQueryOneTypeAllExpensesArgs = {
  input?: Maybe<QueryOneTypeAllExpensesInput>;
};


export type QuerySearchMessageArgs = {
  message?: Maybe<Scalars['String']>;
};


export type QueryUserExpensesSumArgs = {
  input: OneUserAllExpenseInput;
};


export type QueryUserTypesArgs = {
  input: QueryExpensesTypeInput;
};

export type QueryExpensesTypeInput = {
  user: Scalars['String'];
};

export type QueryOneTypeAllExpensesInput = {
  user: Scalars['String'];
  maxDate?: Maybe<Scalars['Date']>;
  minDate?: Maybe<Scalars['Date']>;
  expenseType: ExpenseTypeWhereUniqueInput;
  chosenTagIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
  page?: Maybe<Scalars['Int']>;
};

export type Redwood = {
  __typename?: 'Redwood';
  version?: Maybe<Scalars['String']>;
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  tagName: Scalars['String'];
  expenseType: ExpenseType;
  expenses: Array<Expense>;
};

export type TagWhereInput = {
  ids: Array<Maybe<Scalars['Int']>>;
};

export type TagsWhereUniqueInput = {
  ids: Array<Maybe<Scalars['Int']>>;
};


export type UpdateContactInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type UpdateExpenseInput = {
  id: Scalars['Int'];
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Date']>;
  expenseType?: Maybe<ExpenseTypeWhereUniqueInput>;
  tags?: Maybe<TagsWhereUniqueInput>;
};

export type UpdateExpenseTypeInput = {
  id: Scalars['Int'];
  newName: Scalars['String'];
};

export type UpdatePostInput = {
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  createAt?: Maybe<Scalars['DateTime']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddTagInput: AddTagInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  BatchPayload: ResolverTypeWrapper<BatchPayload>;
  ConnectTagInput: ConnectTagInput;
  ConnectTagsToExpenseInput: ConnectTagsToExpenseInput;
  Contact: ResolverTypeWrapper<Contact>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateContactInput: CreateContactInput;
  CreateExpenseInput: CreateExpenseInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CreateExpenseTypeInput: CreateExpenseTypeInput;
  CreatePostInput: CreatePostInput;
  CreateTagInput: CreateTagInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteContactInput: DeleteContactInput;
  DeleteExpenseTypeInput: DeleteExpenseTypeInput;
  Expense: ResolverTypeWrapper<Expense>;
  ExpensePage: ResolverTypeWrapper<ExpensePage>;
  ExpenseType: ResolverTypeWrapper<ExpenseType>;
  ExpenseTypeWhereUniqueInput: ExpenseTypeWhereUniqueInput;
  ExpensesDetail: ResolverTypeWrapper<ExpensesDetail>;
  ExpensesWhereUniqueInput: ExpensesWhereUniqueInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  LikeContactInput: LikeContactInput;
  Mutation: ResolverTypeWrapper<{}>;
  OneContactInput: OneContactInput;
  OneUserAllExpenseInput: OneUserAllExpenseInput;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  QueryExpensesTypeInput: QueryExpensesTypeInput;
  QueryOneTypeAllExpensesInput: QueryOneTypeAllExpensesInput;
  Redwood: ResolverTypeWrapper<Redwood>;
  Tag: ResolverTypeWrapper<Tag>;
  TagWhereInput: TagWhereInput;
  TagsWhereUniqueInput: TagsWhereUniqueInput;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  UpdateContactInput: UpdateContactInput;
  UpdateExpenseInput: UpdateExpenseInput;
  UpdateExpenseTypeInput: UpdateExpenseTypeInput;
  UpdatePostInput: UpdatePostInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddTagInput: AddTagInput;
  Int: Scalars['Int'];
  BatchPayload: BatchPayload;
  ConnectTagInput: ConnectTagInput;
  ConnectTagsToExpenseInput: ConnectTagsToExpenseInput;
  Contact: Contact;
  String: Scalars['String'];
  CreateContactInput: CreateContactInput;
  CreateExpenseInput: CreateExpenseInput;
  Float: Scalars['Float'];
  CreateExpenseTypeInput: CreateExpenseTypeInput;
  CreatePostInput: CreatePostInput;
  CreateTagInput: CreateTagInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  DeleteContactInput: DeleteContactInput;
  DeleteExpenseTypeInput: DeleteExpenseTypeInput;
  Expense: Expense;
  ExpensePage: ExpensePage;
  ExpenseType: ExpenseType;
  ExpenseTypeWhereUniqueInput: ExpenseTypeWhereUniqueInput;
  ExpensesDetail: ExpensesDetail;
  ExpensesWhereUniqueInput: ExpensesWhereUniqueInput;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  LikeContactInput: LikeContactInput;
  Mutation: {};
  OneContactInput: OneContactInput;
  OneUserAllExpenseInput: OneUserAllExpenseInput;
  Post: Post;
  Query: {};
  QueryExpensesTypeInput: QueryExpensesTypeInput;
  QueryOneTypeAllExpensesInput: QueryOneTypeAllExpensesInput;
  Redwood: Redwood;
  Tag: Tag;
  TagWhereInput: TagWhereInput;
  TagsWhereUniqueInput: TagsWhereUniqueInput;
  Time: Scalars['Time'];
  UpdateContactInput: UpdateContactInput;
  UpdateExpenseInput: UpdateExpenseInput;
  UpdateExpenseTypeInput: UpdateExpenseTypeInput;
  UpdatePostInput: UpdatePostInput;
  Boolean: Scalars['Boolean'];
};

export type BatchPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['BatchPayload'] = ResolversParentTypes['BatchPayload']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ExpenseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Expense'] = ResolversParentTypes['Expense']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  expenseType?: Resolver<ResolversTypes['ExpenseType'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpensePageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpensePage'] = ResolversParentTypes['ExpensePage']> = {
  myExpenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpenseTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpenseType'] = ResolversParentTypes['ExpenseType']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  newName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpensesDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpensesDetail'] = ResolversParentTypes['ExpensesDetail']> = {
  expenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addTag?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationAddTagArgs, 'input'>>;
  connectTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationConnectTagArgs, 'input'>>;
  connectTagsToExpense?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationConnectTagsToExpenseArgs, 'input'>>;
  createContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'input'>>;
  createExpense?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationCreateExpenseArgs, 'input'>>;
  createExpenseType?: Resolver<Maybe<ResolversTypes['ExpenseType']>, ParentType, ContextType, RequireFields<MutationCreateExpenseTypeArgs, never>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  createTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'input'>>;
  deleteContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<MutationDeleteContactArgs, 'input'>>;
  deleteExpense?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationDeleteExpenseArgs, 'id'>>;
  deleteExpenseType?: Resolver<Maybe<ResolversTypes['ExpenseType']>, ParentType, ContextType, RequireFields<MutationDeleteExpenseTypeArgs, never>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteTags?: Resolver<ResolversTypes['BatchPayload'], ParentType, ContextType, RequireFields<MutationDeleteTagsArgs, 'input'>>;
  likeContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<MutationLikeContactArgs, never>>;
  updateExpense?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationUpdateExpenseArgs, 'input'>>;
  updateExpenseType?: Resolver<Maybe<ResolversTypes['ExpenseType']>, ParentType, ContextType, RequireFields<MutationUpdateExpenseTypeArgs, never>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id' | 'input'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  contacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType>;
  expense?: Resolver<Maybe<ResolversTypes['Expense']>, ParentType, ContextType, RequireFields<QueryExpenseArgs, 'id'>>;
  expenseByCategory?: Resolver<ResolversTypes['JSON'], ParentType, ContextType, RequireFields<QueryExpenseByCategoryArgs, 'user'>>;
  expenseByType?: Resolver<ResolversTypes['JSON'], ParentType, ContextType, RequireFields<QueryExpenseByTypeArgs, 'user'>>;
  expenseCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryExpenseCountArgs, 'user'>>;
  expensePage?: Resolver<Maybe<ResolversTypes['ExpensePage']>, ParentType, ContextType, RequireFields<QueryExpensePageArgs, 'user'>>;
  expenseTypes?: Resolver<Array<ResolversTypes['ExpenseType']>, ParentType, ContextType>;
  expenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType>;
  myContacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryMyContactsArgs, 'email'>>;
  myExpenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType, RequireFields<QueryMyExpensesArgs, 'input'>>;
  oneContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryOneContactArgs, 'input'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  queryOneTypeAllExpenses?: Resolver<Maybe<ResolversTypes['ExpensesDetail']>, ParentType, ContextType, RequireFields<QueryQueryOneTypeAllExpensesArgs, never>>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  searchMessage?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QuerySearchMessageArgs, never>>;
  userExpensesSum?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<QueryUserExpensesSumArgs, 'input'>>;
  userTypes?: Resolver<Array<ResolversTypes['ExpenseType']>, ParentType, ContextType, RequireFields<QueryUserTypesArgs, 'input'>>;
};

export type RedwoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tagName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expenseType?: Resolver<ResolversTypes['ExpenseType'], ParentType, ContextType>;
  expenses?: Resolver<Array<ResolversTypes['Expense']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type Resolvers<ContextType = any> = {
  BatchPayload?: BatchPayloadResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Expense?: ExpenseResolvers<ContextType>;
  ExpensePage?: ExpensePageResolvers<ContextType>;
  ExpenseType?: ExpenseTypeResolvers<ContextType>;
  ExpensesDetail?: ExpensesDetailResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redwood?: RedwoodResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Time?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
