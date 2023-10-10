import { useEffect, useRef, useState } from 'react'
import { type Article as ArticleType } from '@/types/article.types'
import ArticleCard from './ArticleCard'

type ArticlesListWebProps = {
  articles: ArticleType[]
  fetchArticles: () => Promise<void>
  onScroll?: any
}

export default function ArticlesListWeb({
  articles,
  fetchArticles,
  onScroll = null,
}: ArticlesListWebProps) {
  const [reachedBottom, setReachedBottom] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.scrollSnapType = 'y mandatory'
      }
    }, 250)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const fetchData = async () => {
    await fetchArticles()
    setReachedBottom(false)
    setTimeout(() => {
      containerRef.current!.style.scrollSnapType = 'y mandatory'
    }, 100)
  }

  const handleScroll = (e: any) => {
    // const bottom =
    //   e.target.scrollHeight - e.target.scrollTop <=
    //   e.target.clientHeight + (IS_ON_DESKTOP ? 50 : 200) + 250
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 50 + 250
    if (bottom && !reachedBottom) {
      setReachedBottom(true)
      containerRef.current!.style.scrollSnapType = 'none'
    }
  }

  useEffect(() => {
    if (reachedBottom) {
      setTimeout(() => {
        fetchData()
      }, 500)
    }
  }, [reachedBottom])

  return (
    <div
      ref={containerRef}
      className="w-screen"
      style={{
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      onScroll={(e) => {
        handleScroll(e)

        if (onScroll !== null) {
          onScroll(e)
        }
      }}
    >
      <div className="hidden w-[30%] md:block"></div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 45,
        }}
      >
        {/* Articles list */}
        <div
          className="w-full md:w-[65%]"
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 200,
          }}
        >
          {articles.map((item, index) => (
            <div
              style={{
                width: '100%',
                scrollSnapAlign: 'center',
              }}
              key={`${item._id}${index}`}
            >
              <ArticleCard article={item} />
            </div>
          ))}
        </div>

        {/* Ads */}
        <div
          className="hidden md:block"
          style={{
            width: '32%',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              width: '100%',
              height: 300,
              position: 'sticky',
              top: 20,
            }}
          ></div>
        </div>
      </div>

      <div className="hidden w-[30%] md:block"></div>
    </div>
  )
}
