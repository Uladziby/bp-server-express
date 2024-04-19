/* eslint-disable */
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
};

export type Book = {
  author: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type BookInput = {
  author: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Cart = {
  _id: Scalars['String']['output'];
  products: Array<CartItem>;
};

export type CartCreateInput = {
  productId?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type CartItem = {
  productId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  products: Array<CategoryProduct>;
  slug: Scalars['String']['output'];
};

export type CategoryList = {
  data: Array<Category>;
  meta?: Maybe<MetaList>;
};

export type CategoryProduct = {
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
};

export type Collection = {
  _id: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Image;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type CollectionsList = {
  data: Array<Collection>;
  meta?: Maybe<MetaList>;
};

export type Image = {
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type MetaList = {
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Mutation = {
  addBook?: Maybe<Book>;
  cartAddItem: Cart;
  cartChangeItemQuantity: Cart;
  cartCreate: Cart;
  createReview: Scalars['String']['output'];
  login?: Maybe<PairsOfTokens>;
  loginOld: User;
  logout: User;
  removeBook?: Maybe<Book>;
  signUp: User;
  updateBook?: Maybe<Book>;
};


export type MutationAddBookArgs = {
  book: BookInput;
};


export type MutationCartAddItemArgs = {
  cartId: Scalars['ID']['input'];
  input?: InputMaybe<CartCreateInput>;
};


export type MutationCartChangeItemQuantityArgs = {
  cartId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartCreateArgs = {
  input: CartCreateInput;
};


export type MutationCreateReviewArgs = {
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginData: UserLoginInput;
};


export type MutationLoginOldArgs = {
  loginData: UserLoginInput;
};


export type MutationLogoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveBookArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateBookArgs = {
  book: UpdateBookInput;
  id: Scalars['ID']['input'];
};

export type PairsOfTokens = {
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Product = {
  category: ProductCategory;
  collection: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Image>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
};

export type ProductCategory = {
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta?: Maybe<MetaList>;
};

export type ProductSortBy =
  | 'DEFAULT'
  | 'NAME'
  | 'PRICE'
  | 'RATING';

export type Query = {
  book?: Maybe<Book>;
  books: Array<Book>;
  cart: Cart;
  categories: CategoryList;
  collection: Collection;
  collectionProducts: ProductList;
  collections: CollectionsList;
  getTokens?: Maybe<PairsOfTokens>;
  product?: Maybe<Product>;
  products: ProductList;
  reviews: Array<Review>;
  users: Array<User>;
};


export type QueryBookArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCartArgs = {
  cartId: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryCollectionArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCollectionProductsArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCollectionsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryGetTokensArgs = {
  loginData: UserLoginInput;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryReviewsArgs = {
  id: Scalars['ID']['input'];
};

export type Review = {
  _id: Scalars['String']['output'];
  author: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type Subscription = {
  book: Book;
  user: User;
};

export type UpdateBookInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  _id?: Maybe<Scalars['String']['output']>;
  accessToken: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
