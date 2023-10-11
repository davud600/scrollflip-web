'use client'

import { useUser } from '@/hooks/user'
import { type Article } from '@/types/article.types'
import { getTimeSinceArticleCreated } from '@/utils/article'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import AddOrRemoveToWhishlistButton from '../Wishlist/AddOrRemoveToWhishlistButton'

type CustomArticleContentProps = {
  article: Article
}

export default function CustomArticleContent({
  article,
}: CustomArticleContentProps) {
  const {
    userWishlistedProducts,
    addProductToWishlist,
    removeProductFromWishlist,
  } = useUser()

  const articleContent = article.content
  const source = {
    html: articleContent.substring(0, articleContent.length - 120),
  }
  const articleDate = new Date(article.created)

  useEffect(() => {
    const xpath = "//div[contains(text(),'NUM_OF_PRODUCTS:')]"
    const numOfProductsElem: any = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue

    if (!!!numOfProductsElem) return

    const numOfProducts = numOfProductsElem.innerText.slice(16)

    for (let i = 0; i < numOfProducts; i++) {
      const xpath = `//div[contains(text(),'PRODUCT${i}:')]`
      const productElem: any = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue

      if (!!!productElem) continue

      const root = createRoot(productElem)
      root.render(
        <AddOrRemoveToWhishlistButton
          product={JSON.parse(productElem.innerText.slice(9))}
          userWishlistedProducts={userWishlistedProducts}
          addProductToWishlist={addProductToWishlist}
          removeProductFromWishlist={removeProductFromWishlist}
        />
      )
    }
  }, [article, JSON.stringify(userWishlistedProducts)])

  return (
    <div className="my-16 flex flex-col px-3 py-6 md:px-[20%]">
      <span className="mt-3 font-semibold underline">{article.category}</span>
      <span>Posted {getTimeSinceArticleCreated(articleDate)}</span>

      <span className="mb-2 mt-3 text-3xl font-semibold">{article.title}</span>
      <span className="mb-2 text-base">{article.description}</span>
      <span className="mb-4">
        by <span className="font-bold text-[#144270]">{article.author}</span>
      </span>

      <div dangerouslySetInnerHTML={{ __html: source.html }}></div>
    </div>
  )
}
