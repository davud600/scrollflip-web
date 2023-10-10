import CustomArticleContent from '@/components/Article/CustomArticleContent'
import ShareButton from '@/components/Article/ShareButton'
import { useRouter } from 'next/router'
import { type Article as ArticleType } from '@/types/article.types'
import { useEffect, useState } from 'react'

export default function Article() {
  const router = useRouter()
  const [article, setArticle] = useState<ArticleType | null>(null)

  useEffect(() => {
    if (!!article) return

    const fetchArticle = async () => {
      try {
      } catch (error) {
        return
      }
    }

    fetchArticle()
  }, [])

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-white">
        {!!article && <CustomArticleContent article={article} />}
        <ShareButton
          articleLink={`${window.location}/article/${router.query.articleId}`}
        />
        {/* <ShareButton
          articleLink={`${window.location}/?articleId=${route.params.article._id}`}
        /> */}
      </div>
    </div>
  )
}
