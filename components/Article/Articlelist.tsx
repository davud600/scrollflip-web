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
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
        getScrollParent={() => scrollParentRef.current}
      >
        {articles.map((article, index) => (
          <div
            className="h-[100svh] snap-center md:h-fit"
            key={`${article._id}${index}`}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}
