'use client'

import UserService from '@/services/user.service'
import { type UserLikedArticle } from '@/types/article.types'
import { type statusCallback } from '@/types/status-callbacks.types'
import {
  type LikeArticleParams,
  type LogInCredentials,
  type SignUpCredentials,
  type User,
  type UserContextData,
  type UserWishListedProduct,
} from '@/types/user.types'
import {
  extractValuesFromDescription,
  extractValuesFromDescriptionCustomArticles,
} from '@/utils/article'
import { createContext, useEffect, useState, type ReactNode } from 'react'

export const UserContext = createContext<UserContextData | undefined>(undefined)

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [userLikedArticles, setUserLikedArticles] = useState<
    UserLikedArticle[]
  >([])
  const [userWishlistedProducts, setUserWishlistedProducts] = useState<
    UserWishListedProduct[]
  >([])
  const [isEnabledWishlist, setIsEnabledWishlist] = useState<boolean>(false)

  useEffect(() => {
    const updateUserData = async () => {
      const userFromStorageJson = localStorage.getItem('user')
      const tokenFromStorageJson = localStorage.getItem('token')

      if (!!!userFromStorageJson || userFromStorageJson === 'undefined') return
      const userFromStorage = JSON.parse(userFromStorageJson)

      if (!!!tokenFromStorageJson || tokenFromStorageJson === 'undefined')
        return
      const tokenFromStorage = JSON.parse(tokenFromStorageJson)

      if (userFromStorage === null || tokenFromStorage === null) return

      const response = await UserService.getUserInfo({
        userFromStorage,
        tokenFromStorage,
      })

      if (!!!response) return

      const data = await response.json()

      localStorage.setItem('user', JSON.stringify(data.data))
      setUser(data.data)
      setToken(tokenFromStorage)
    }

    const updateWishListFromStorage = async () => {
      const wishListFromStorageJson = localStorage.getItem(
        'userWishlistedProducts'
      )
      if (!!!wishListFromStorageJson || wishListFromStorageJson === 'undefined')
        return

      const wishListFromStorage = JSON.parse(wishListFromStorageJson)

      if (!!!wishListFromStorage) return

      setUserWishlistedProducts([...wishListFromStorage])
    }

    updateUserData()
    updateWishListFromStorage()
  }, [])

  useEffect(() => {
    if (!!!user) return

    const fetchLikedArticles = async () => {
      if (!!!token) return

      const response = await UserService.getLikedArticles({
        userEmail: user.email,
        token,
      })

      if (!!!response) return

      const data = await response.json()

      if (!!!data.data) return

      const articleData = data.data

      for (let i = 0; i < articleData.length; i++) {
        if (!!!articleData[i]) continue

        const { imgSrc, h1Content, anchorHref } =
          articleData[i].rssId === 'custom-article'
            ? extractValuesFromDescriptionCustomArticles(articleData[i])
            : extractValuesFromDescription(articleData[i].description)

        articleData[i] = { ...articleData[i], imgSrc, h1Content, anchorHref }
      }

      setUserLikedArticles(data.data)
    }

    fetchLikedArticles()
  }, [user])

  useEffect(() => {
    const updateLocalStorage = async () => {
      localStorage.setItem(
        'userWishlistedProducts',
        JSON.stringify(userWishlistedProducts)
      )
    }

    updateLocalStorage()
  }, [JSON.stringify(userWishlistedProducts)])

  /**
   * Auth START
   */
  const logIn = async (
    { email, password }: LogInCredentials,
    errorCallback?: statusCallback,
    successCallback?: statusCallback
  ) => {
    try {
      const response = await UserService.login({ email, password })

      if (!!!response) {
        if (!!errorCallback) errorCallback()
        return
      }

      const data = await response.json()

      if (!!!data.data || response.status !== 200) {
        if (!!errorCallback) errorCallback(data.message)
        return
      }

      if (!!successCallback) successCallback(data.message)

      localStorage.setItem('user', JSON.stringify(data.data.userData))
      localStorage.setItem('token', JSON.stringify(data.data.token))

      setUser(data.data.userData)
      setToken(data.data.token)
    } catch (error) {
      if (!!errorCallback) errorCallback()
      return
    }
  }

  const signUp = async (
    { email, username, password, confirmPassword }: SignUpCredentials,
    errorCallback?: statusCallback,
    successCallback?: statusCallback
  ) => {
    if (password !== confirmPassword && !!errorCallback) {
      errorCallback('Passwords do not match!')
      return
    }

    try {
      const response = await UserService.signup({
        email,
        username,
        password,
        confirmPassword,
      })

      if (!!!response) {
        if (!!errorCallback) errorCallback()
        return
      }

      const { message } = await response.json()

      if (response.status !== 200) {
        if (!!errorCallback) errorCallback(message)
        return
      }

      if (!!successCallback) successCallback(message)
    } catch (error) {
      if (!!errorCallback) errorCallback()
      return
    }
  }

  const logOut = async (navigation: any) => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    setUser(null)
    setToken(null)

    navigation.navigate('Log In')
  }
  /**
   * Auth END
   */

  const addOrRemoveLikedArticle = async (
    { likedArticle, articleId }: LikeArticleParams,
    errorCallback?: statusCallback,
    successCallback?: statusCallback
  ) => {
    if (!!!user) {
      if (!!errorCallback)
        errorCallback("Can't Favorite Articles if not logged in!")
      return
    }

    const response = await UserService.updateFavoriteArticles({
      likedArticle,
      articleId,
      userId: user?._id,
    })

    if (!!!response) {
      if (!!errorCallback) errorCallback()
      return
    }

    const { message } = await response.json()

    if (response.status !== 200) {
      if (!!errorCallback) errorCallback(message)
      return
    }

    if (likedArticle) {
      // add to arr
      setUser((prevUser) => {
        return {
          ...prevUser,
          likedArticles: [
            ...prevUser!.likedArticles,
            {
              articleId,
              _id: 'null',
            },
          ],
        } as unknown as User
      })
    } else {
      // remove from arr
      setUser((prevUser) => {
        return {
          ...prevUser,
          likedArticles: prevUser!.likedArticles.filter(
            (a) => a.articleId !== articleId
          ),
        } as unknown as User
      })
    }

    if (!!successCallback) successCallback(message)
  }

  const addProductToWishlist = (product: UserWishListedProduct) => {
    setUserWishlistedProducts((list) => [...list, product])
    setIsEnabledWishlist(true)
  }

  const removeProductFromWishlist = (product: UserWishListedProduct) => {
    setUserWishlistedProducts((list) =>
      list.filter((item) => item.name !== product.name)
    )
  }

  const value = {
    UserState: {
      user,
      setUser,
    },
    logIn,
    logOut,
    signUp,
    addOrRemoveLikedArticle,
    userLikedArticles,
    setUserLikedArticles,
    userWishlistedProducts,
    setUserWishlistedProducts,
    addProductToWishlist,
    removeProductFromWishlist,
    isEnabledWishlist,
    setIsEnabledWishlist,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
