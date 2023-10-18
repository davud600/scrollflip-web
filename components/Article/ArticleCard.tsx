import { type Article } from '@/types/article.types'
import LikeButton from './LikeButton'
import ReadmoreButton from './ReadmoreButton'

type ArticleCardProps = {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="relative h-[100svh] w-full overflow-hidden md:h-auto md:pb-12">
      <div
        className="flex h-[66%] !w-full flex-col items-start justify-end bg-cover bg-no-repeat md:h-[50vh]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0) 75%, rgba(255,255,255,0.8309917717086834) 85%, rgba(255,255,255,1) 95%), url('${article.imgSrc}')`,
        }}
      >
        <span className="mx-4 text-xl font-bold text-black">
          {article.title}
        </span>
      </div>

      <div className="mt-2 flex flex-col justify-end gap-2">
        <span className="mx-4 text-sm text-black opacity-60">
          {article.rssId === 'custom-article'
            ? article.description
            : article.h1Content}
        </span>

        <span className="mx-4 mb-1 mt-3 text-base text-black opacity-80 md:text-base">
          From:{' '}
          <span className="font-black text-[#E01E26]">{article.source}</span>
        </span>

        <div className="w-full">
          <div className="s-full mx-4 flex items-center justify-between rounded-sm">
            <ReadmoreButton article={article} />
            <LikeButton article={article} />
          </div>
        </div>
      </div>
    </div>
  )
}
