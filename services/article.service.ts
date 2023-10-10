import { API_URL } from '@/constants/api'
import { ARTICLES_PER_PAGE_LIMIT } from '@/constants/settings'
import {
  type FetchArticlesParams,
  type FetchSearchingArticlesParams,
  type RefreshArticlesParams,
  type RefreshSearchingArticlesParams,
  type FindArticleParams,
} from '@/types/article.types'

const ArticleService = {
  findArticle: async ({
    articleId,
  }: FindArticleParams): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${API_URL}/custom-news/${articleId}`)

      return response
    } catch (error) {
      console.error(error)
    }
  },

  fetchArticles: async ({
    page,
    category = '',
  }: FetchArticlesParams): Promise<Response | undefined> => {
    try {
      const response = await fetch(
        `${API_URL}/news?limit=${ARTICLES_PER_PAGE_LIMIT}&page=${
          page + 1
        }&category=${encodeURIComponent(category)}`
      )

      return response
    } catch (error) {
      console.error(error)
    }
  },

  refreshArticles: async ({
    category = '',
  }: RefreshArticlesParams): Promise<Response | undefined> => {
    try {
      const response = await fetch(
        `${API_URL}/news?limit=${ARTICLES_PER_PAGE_LIMIT}&page=${0}&category=${encodeURIComponent(
          category
        )}`
      )

      return response
    } catch (error) {
      console.error(error)
    }
  },

  fetchSearchingArticles: async ({
    page,
    search = '',
  }: FetchSearchingArticlesParams): Promise<Response | undefined> => {
    try {
      const response = await fetch(
        `${API_URL}/news?limit=${ARTICLES_PER_PAGE_LIMIT}&page=${
          page + 1
        }&search_query=${search}`
      )

      return response
    } catch (error) {
      console.error(error)
    }
  },

  refreshSearchingArticles: async ({
    search = '',
  }: RefreshSearchingArticlesParams): Promise<Response | undefined> => {
    try {
      const response = await fetch(
        `${API_URL}/news?limit=${ARTICLES_PER_PAGE_LIMIT}&page=${0}&search_query=${search}`
      )

      return response
    } catch (error) {
      console.error(error)
    }
  },
}

export default ArticleService
