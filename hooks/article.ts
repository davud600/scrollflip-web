import { useContext } from 'react'
import { ArticleContext } from '@/context/articleContext'
import { type ArticleContextData } from '@/types/article.types'

export function useArticle() {
  return useContext(ArticleContext) as ArticleContextData
}
