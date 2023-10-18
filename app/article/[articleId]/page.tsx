import ShareButton from '@/components/Article/ShareButton'
import ArticleService from '@/services/article.service'
import CustomArticleContent from '@/components/Article/CustomArticleContent'

export default async function Article({
  params,
}: {
  params: { articleId: string }
}) {
  const response = await ArticleService.findArticle({
    articleId: params.articleId,
  })
  const data = await response?.json()
  const article = data.data

  return (
    <main>
      <section className="mt-[64px]">
        <div className="flex h-screen bg-white">
          {!!article && <CustomArticleContent article={article} />}

          {!!article && <ShareButton articleId={article._id} />}
        </div>
      </section>
    </main>
  )
}
