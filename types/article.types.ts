import { type Dispatch } from 'react'

export type Article = any

export type CustomArticle = any

export type UserLikedArticle = any

export type FindArticleParams = {
  articleId: string
}

export type FetchArticlesParams = {
  page: number
  category?: string
}

export type RefreshArticlesParams = {
  category?: string
}

export type FetchSearchingArticlesParams = {
  page: number
  search?: string
}

export type RefreshSearchingArticlesParams = {
  search?: string
}

export type ArticleContextData = {
  ArticlesState: {
    articles: Article[]
    setArticles: Dispatch<React.SetStateAction<Article[]>>
    searchingArticles: Article[]
    setSearchingArticles: Dispatch<React.SetStateAction<Article[]>>
    isLoading: boolean
    setIsLoading: Dispatch<React.SetStateAction<boolean>>
  }
  SearchState: {
    search: string
    setSearch: Dispatch<React.SetStateAction<string>>
  }
  CategoryState: {
    category: string
    setCategory: Dispatch<React.SetStateAction<string>>
  }
  fetchArticles: () => Promise<void>
  refreshArticles: () => Promise<void>
  fetchSearchingArticles: () => Promise<void>
  refreshSearchingArticles: () => Promise<void>
  resetPage: () => void
  findArticle: (articleId: string) => Promise<Article>
}
