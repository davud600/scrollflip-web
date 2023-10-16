'use client'

import ArticlesList from '@/components/Article/Articlelist'
import NoResults from '@/components/Article/NoResults'
import { useArticle } from '@/hooks/article'

export default function Search() {
  const { ArticlesState, fetchSearchingArticles, SearchState } = useArticle()

  return (
    <main>
      <section className="mt-[64px] h-full flex-1 items-center justify-center overflow-hidden">
        <div className="flex-1">
          {ArticlesState.searchingArticles.length === 0 &&
          SearchState.search !== '' ? (
            <NoResults />
          ) : (
            <ArticlesList
              articles={ArticlesState.searchingArticles}
              fetchArticles={fetchSearchingArticles}
            />
          )}
        </div>
      </section>
    </main>
  )
}
