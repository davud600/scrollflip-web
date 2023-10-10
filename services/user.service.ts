import { API_URL } from '@/constants/api'
import {
  type GetLikedArticlesParams,
  type GetUserInfoParams,
  type LikeArticleParams,
  type LogInCredentials,
  type SignUpCredentials,
} from '@/types/user.types'

const UserService = {
  signup: async ({
    email,
    username,
    password,
    confirmPassword,
  }: SignUpCredentials): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          confirmPassword,
        }),
      })

      return response
    } catch (error) {
      console.error(error)
    }
  },

  login: async ({
    email,
    password,
  }: LogInCredentials): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      return response
    } catch (error) {
      console.error(error)
    }
  },

  updateFavoriteArticles: async ({
    likedArticle,
    articleId,
    userId,
  }: LikeArticleParams): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${API_URL}/news/like`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likedArticle,
          articleId,
          userId: userId,
        }),
      })

      return response
    } catch (error) {
      console.error(error)
    }
  },

  getUserInfo: async ({
    userFromStorage,
    tokenFromStorage,
  }: GetUserInfoParams): Promise<Response | undefined> => {
    try {
      const response = await fetch(
        `${API_URL}/users?email=${userFromStorage.email}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        }
      )

      return response
    } catch (error) {
      console.error(error)
    }
  },

  getLikedArticles: async ({
    userEmail,
    token,
  }: GetLikedArticlesParams): Promise<Response | undefined> => {
    try {
      const response = await fetch(
        `${API_URL}/users/liked-articles?email=${userEmail}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response
    } catch (error) {
      console.error(error)
    }
  },
}

export default UserService
