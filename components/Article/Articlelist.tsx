import { type Article as ArticleType } from '@/types/article.types'
import ArticleCard from './ArticleCard'
import InfiniteScroll from 'react-infinite-scroller'
import { useRef } from 'react'

type ArticlesListProps = {
  articles: ArticleType[]
  fetchArticles: () => Promise<void>
}

export default function ArticlesList({
  articles,
  fetchArticles,
}: ArticlesListProps) {
  const scrollParentRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={scrollParentRef}
      className="h-screen snap-y snap-mandatory overflow-y-scroll px-0 md:px-[25vw]"
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchArticles}
        initialLoad={false}
        hasMore={true}
        loader={
          <svg
            key={0}
            className="spinner absolute left-1/2 top-1/2 -z-20 h-screen w-screen -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 50 50"
          >
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            ></circle>
          </svg>
        }
        useWindow={false}
        getScrollParent={() => scrollParentRef.current}
      >
        {articles.map((article, index) => (
          <div
            className="h-[100svh] snap-center bg-white md:h-fit"
            key={`${article._id}${index}`}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}
