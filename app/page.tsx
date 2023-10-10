'use client'

import Articleslist from '@/components/Article/Articlelist'
// import FacebookPixel from '@/components/Shared/FacebookPixel'
import { useArticle } from '@/hooks/article'

export default function Home() {
  const { ArticlesState, fetchArticles } = useArticle()

  return (
    <>
      {/* <FacebookPixel /> */}

      <div className="h-full flex-1 items-center justify-center overflow-hidden bg-white">
        <div className="flex-1">
          <Articleslist
            articles={ArticlesState.articles}
            fetchArticles={fetchArticles}
          />
        </div>
      </div>
    </>
  )
}
