'use client'

import CustomArticleContent from '@/components/Article/CustomArticleContent'
import ShareButton from '@/components/Article/ShareButton'
import { type Article as ArticleType } from '@/types/article.types'
import { useEffect, useState } from 'react'
import ArticleService from '@/services/article.service'

export default function Article({ params }: { params: { articleId: string } }) {
  const [article, setArticle] = useState<ArticleType | null>(null)

  useEffect(() => {
    if (!!article) return

    const fetchArticle = async () => {
      try {
        const response = await ArticleService.findArticle({
          articleId: params.articleId,
        })

        const data = await response?.json()
        setArticle(data.data)
      } catch (error) {
        return
      }
    }

    fetchArticle()
  }, [])

  return (
    <main>
      <section className="mt-[64px]">
        <div className="flex h-screen bg-white">
          {!!article && <CustomArticleContent article={article} />}
          {!!article && (
            <ShareButton
              articleLink={`${window.location.origin}/article/${article._id}`}
            />
          )}
        </div>
      </section>
    </main>
  )
}
