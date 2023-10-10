'use client'

import { Article } from '@/types/article.types'

type ReadmoreButtonParams = {
  article: Article
}

export default function ReadmoreButton({ article }: ReadmoreButtonParams) {
  return (
    <button
      onClick={() => {
        window.open(article.anchorHref, '_blank')
      }}
      className="bg-[#E01E26] px-6 py-3 font-bold md:px-5 md:py-2"
    >
      <span className="text-base font-bold text-white md:text-sm">
        Read More
      </span>
    </button>
  )
}
