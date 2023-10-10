import { type Dispatch, type SetStateAction } from 'react'
import { type UserLikedArticle } from './article.types'
import { type statusCallback } from './status-callbacks.types'

export type UserWishListedProduct = {
  name: string
  redirectUrl: string
  imageUrl: string
  price: number
}

export type LikedArticle = {
  articleId: string
  _id: string
}

export type User = {
  _id?: any
  username: string
  email: string
  likedArticles: LikedArticle[]
  password: string
  created?: Number
}

export type LogInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export type LikeArticleParams = {
  likedArticle: boolean
  articleId: string
  userId?: string
}

export type GetUserInfoParams = {
  userFromStorage: any
  tokenFromStorage: any
}

export type GetLikedArticlesParams = {
  userEmail: string
  token: string
}

export type UserContextData = {
  UserState: {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
  }
  logIn: (
    { email, password }: LogInCredentials,
    errorCallback?: statusCallback,
    successCallback?: statusCallback
  ) => Promise<void>
  logOut: (navigation: any) => Promise<void>
  signUp: (
    { email, username, password, confirmPassword }: SignUpCredentials,
    errorCallback?: statusCallback,
    successCallback?: statusCallback
  ) => Promise<void>
  addOrRemoveLikedArticle: (
    { likedArticle, articleId }: LikeArticleParams,
    errorCallback?: statusCallback,
    successCallback?: statusCallback
  ) => Promise<void>
  userLikedArticles: UserLikedArticle[]
  setUserLikedArticles: Dispatch<SetStateAction<UserLikedArticle>>
  userWishlistedProducts: UserWishListedProduct[]
  addProductToWishlist: (product: UserWishListedProduct) => void
  removeProductFromWishlist: (product: UserWishListedProduct) => void
  isEnabledWishlist: boolean
  setIsEnabledWishlist: Dispatch<SetStateAction<boolean>>
}
