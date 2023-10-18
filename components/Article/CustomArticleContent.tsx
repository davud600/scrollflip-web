'use client'

import { useUser } from '@/hooks/user'
import { type Article } from '@/types/article.types'
import { getTimeSinceArticleCreated } from '@/utils/article'
import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import AddOrRemoveToWishlistButton from '../Wishlist/AddOrRemoveToWishlistButton'

const ButtonRoots: any = {}

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

  const contentContainerRef = useRef<HTMLDivElement | null>(null)

  const articleContent = article.content
  const source = {
    html: articleContent.substring(0, articleContent.length - 120),
  }
  const articleDate = new Date(article.created)

  useEffect(() => {
    if (!!!contentContainerRef.current) return

    contentContainerRef.current.innerHTML = source.html
  }, [])

  useEffect(() => {
    const wishlistBtnElems = document.querySelectorAll('.product-wishlist-btn')

    wishlistBtnElems.forEach((wishlistBtnElem: any) => {
      const product = JSON.parse(wishlistBtnElem.innerText.slice(9))

      ButtonRoots[product.name] = {
        root: createRoot(wishlistBtnElem),
        product: JSON.parse(wishlistBtnElem.innerText.slice(9)),
      }

      ButtonRoots[product.name].root.render(
        <AddOrRemoveToWishlistButton
          product={product}
          userWishlistedProducts={userWishlistedProducts}
          addProductToWishlist={addProductToWishlist}
          removeProductFromWishlist={removeProductFromWishlist}
        />
      )
    })
  }, [])

  useEffect(() => {
    for (const key in ButtonRoots) {
      ButtonRoots[key].root.render(
        <AddOrRemoveToWishlistButton
          product={ButtonRoots[key].product}
          userWishlistedProducts={userWishlistedProducts}
          addProductToWishlist={addProductToWishlist}
          removeProductFromWishlist={removeProductFromWishlist}
        />
      )
    }
  }, [JSON.stringify(userWishlistedProducts)])

  return (
    <div className="flex flex-col px-3 py-6 md:px-[20%]">
      <span className="mt-3 font-semibold underline">{article.category}</span>
      <span>Posted {getTimeSinceArticleCreated(articleDate)}</span>

      <span className="mb-2 mt-3 text-3xl font-semibold">{article.title}</span>
      <span className="mb-2 text-base">{article.description}</span>
      <span className="mb-4">
        by <span className="font-bold text-[#144270]">{article.author}</span>
      </span>

      <div ref={contentContainerRef}></div>
    </div>
  )
}
