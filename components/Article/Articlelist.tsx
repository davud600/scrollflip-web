import { type Article as ArticleType } from '@/types/article.types'
import { useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleCard from './ArticleCard'

type ArticlesListProps = {
  articles: ArticleType[]
  fetchArticles: () => Promise<void>
  onScroll?: any
}

export default function ArticlesList({
  articles,
  fetchArticles,
  onScroll = null,
}: ArticlesListProps) {
  return (
    <InfiniteScroll
      className="w-full"
      dataLength={articles.length}
      next={fetchArticles}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {articles.map((article, index) => (
        <ArticleCard article={article} key={`${article._id}${index}`} />
      ))}
    </InfiniteScroll>
  )
}
