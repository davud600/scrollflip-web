'use client'

import ArticleService from '@/services/article.service'
import { type Article, type ArticleContextData } from '@/types/article.types'
import {
  extractValuesFromDescription,
  extractValuesFromDescriptionCustomArticles,
} from '@/utils/article'
import { createContext, useEffect, useState, type ReactNode } from 'react'

export const ArticleContext = createContext<ArticleContextData | undefined>(
  undefined
)

export default function ArticleProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchingArticles, setSearchingArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)
  const [searchingArticlesPage, setSearchingArticlesPage] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  useEffect(() => {
    if (search === '') {
      setSearchingArticles([])
      setSearchingArticlesPage(0)
      return
    }

    refreshSearchingArticles()
  }, [search])

  /** Fetch Initial Articles */
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      await refreshArticles()
      setIsLoading(false)
    }

    fetchData()
  }, [category])

  const findArticle = async (articleId: string) => {
    try {
      const response = await ArticleService.findArticle({ articleId })

      if (response === undefined) return

      const data = await response.json()

      const articleData = data.data

      return articleData
    } catch (error) {
      console.error(error)
    }
  }

  const fetchArticles = async () => {
    try {
      const response = await ArticleService.fetchArticles({ page, category })

      if (!!!response) return

      const data = await response.json()

      const articleData = [...data.data]

      for (let i = 0; i < articleData.length; i++) {
        const { imgSrc, h1Content, anchorHref } =
          articleData[i].rssId === 'custom-article'
            ? extractValuesFromDescriptionCustomArticles(articleData[i])
            : extractValuesFromDescription(articleData[i].description)

        articleData[i] = { ...articleData[i], imgSrc, h1Content, anchorHref }
      }

      setArticles((prevArticles) => {
        return [...prevArticles, ...articleData]
      })

      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error(error)
    }
  }

  const refreshArticles = async () => {
    try {
      const response = await ArticleService.refreshArticles({ category })

      if (!!!response) return

      const data = await response.json()

      const articleData = [...data.data]

      for (let i = 0; i < articleData.length; i++) {
        const { imgSrc, h1Content, anchorHref } =
          articleData[i].rssId === 'custom-article'
            ? extractValuesFromDescriptionCustomArticles(articleData[i])
            : extractValuesFromDescription(articleData[i].description)

        articleData[i] = { ...articleData[i], imgSrc, h1Content, anchorHref }
      }

      setArticles([...articleData])
      setPage(0)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchSearchingArticles = async () => {
    try {
      const response = await ArticleService.fetchSearchingArticles({
        page: searchingArticlesPage,
        search,
      })

      if (!!!response) return

      const data = await response.json()

      const articleData = [...data.data]

      for (let i = 0; i < articleData.length; i++) {
        const { imgSrc, h1Content, anchorHref } =
          articleData[i].rssId === 'custom-article'
            ? extractValuesFromDescriptionCustomArticles(articleData[i])
            : extractValuesFromDescription(articleData[i].description)

        articleData[i] = { ...articleData[i], imgSrc, h1Content, anchorHref }
      }

      setSearchingArticles((prevArticles) => {
        return [...prevArticles, ...articleData]
      })

      setSearchingArticlesPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error(error)
    }
  }

  const refreshSearchingArticles = async () => {
    try {
      const response = await ArticleService.refreshSearchingArticles({
        search,
      })

      if (!!!response) return

      const data = await response.json()

      const articleData = [...data.data]

      for (let i = 0; i < articleData.length; i++) {
        const { imgSrc, h1Content, anchorHref } =
          articleData[i].rssId === 'custom-article'
            ? extractValuesFromDescriptionCustomArticles(articleData[i])
            : extractValuesFromDescription(articleData[i].description)

        articleData[i] = { ...articleData[i], imgSrc, h1Content, anchorHref }
      }

      setSearchingArticles([...articleData])
      setSearchingArticlesPage(0)
    } catch (error) {
      console.error(error)
    }
  }

  const resetPage = () => {
    setPage(0)
  }

  useEffect(() => {
    if (search !== '') refreshArticles()
  }, [search])

  const value = {
    ArticlesState: {
      articles,
      setArticles,
      searchingArticles,
      setSearchingArticles,
      isLoading,
      setIsLoading,
    },
    SearchState: {
      search,
      setSearch,
    },
    CategoryState: {
      category,
      setCategory,
    },
    fetchArticles,
    refreshArticles,
    fetchSearchingArticles,
    refreshSearchingArticles,
    resetPage,
    findArticle,
  }

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  )
}
