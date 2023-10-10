'use client'

import ArticlesList from '@/components/Article/Articlelist'
// import FacebookPixel from '@/components/Shared/FacebookPixel'
import { useArticle } from '@/hooks/article'

export default function Home() {
  const { ArticlesState, fetchArticles } = useArticle()

  return (
    <>
      {/* <FacebookPixel /> */}

      <main className="bg-white">
        <section className="mt-[64px]">
          <div className="flex w-screen justify-center">
            {/* left empty block */}
            <div className="hidden w-[30%] md:block"></div>

            <div className="flex w-full justify-center gap-10">
              {/* Articles list */}
              <div className="w-full pb-96 md:w-[65%]">
                <ArticlesList
                  articles={ArticlesState.articles}
                  fetchArticles={fetchArticles}
                />
              </div>

              {/* Ads right side */}
              <div className="hidden w-[32%] flex-col gap-96 md:flex">
                <div className="h-[300rem]">
                  <div className="sticky top-20 h-[300px] w-full bg-neutral-200"></div>
                </div>
                <div className="h-[300rem]">
                  <div className="sticky top-20 h-[300px] w-full bg-neutral-200"></div>
                </div>
                <div className="h-[300rem]">
                  <div className="sticky top-20 h-[300px] w-full bg-neutral-200"></div>
                </div>
                <div className="h-[300rem]">
                  <div className="sticky top-20 h-[300px] w-full bg-neutral-200"></div>
                </div>
              </div>
            </div>

            {/* right empty block */}
            <div className="hidden w-[30%] md:block"></div>
          </div>
        </section>
      </main>
    </>
  )
}
