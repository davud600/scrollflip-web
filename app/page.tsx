'use client'
import ArticlesList from '@/components/Article/Articlelist'
// import FacebookPixel from '@/components/Shared/FacebookPixel'
import { useArticle } from '@/hooks/article'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const { ArticlesState, fetchArticles } = useArticle()
  const searchParams = useSearchParams()

  const articleId = searchParams.get('articleId')

  if (!!articleId) {
    window.location.replace(`/article/${articleId}`)
  }

  return (
    <>
      {/* <FacebookPixel /> */}

      <main>
        <section className="mt-[64px] h-full flex-1 items-center justify-center overflow-hidden">
          <div className="flex-1">
            <ArticlesList
              articles={ArticlesState.articles}
              fetchArticles={fetchArticles}
            />
          </div>
        </section>
      </main>
    </>
  )
}
