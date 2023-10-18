'use client'

import { useOutsideClickDetector } from '@/hooks/outsideclick'
import { useUser } from '@/hooks/user'
import Image from 'next/image'
import { useRef } from 'react'

export default function WishList() {
  const {
    UserState,
    userWishlistedProducts,
    isEnabledWishlist,
    setIsEnabledWishlist,
    removeProductFromWishlist,
  } = useUser()

  // Outside click for wishlist
  // const wishlistRef = useRef<HTMLDivElement | null>(null)
  // useOutsideClickDetector(wishlistRef, () => setIsEnabledWishlist(false))

  return !isEnabledWishlist ? (
    <></>
  ) : (
    <div
      // ref={wishlistRef}
      className="fixed left-0 top-[63px] z-50 w-screen rounded-sm bg-[#faf9f7] p-4 text-black md:left-[65%] md:w-[350px]"
      style={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        filter:
          'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      }}
    >
      <div className="flex justify-between">
        <div className="mb-5 flex flex-col">
          <span style={{ fontSize: 18, fontWeight: 'bold' }}>
            Your Wishlist
          </span>
          <span>You have {userWishlistedProducts.length} listed products</span>
        </div>

        <button onClick={() => setIsEnabledWishlist(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
            className="h-7 w-7 fill-neutral-400"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>

      <div className="h-[200px] overflow-y-scroll md:h-[250px]">
        {userWishlistedProducts.map((item, index) => (
          <div
            key={`${item.name}${index}`}
            onClick={() => window.open(item.redirectUrl, '_blank')}
            className="cursor-pointer"
          >
            <div className="mb-2 flex items-center justify-between rounded-sm border border-[rgba(0,_0,_0,_0.1)] bg-white p-2">
              <div className="flex items-center">
                <Image
                  className="my-2 h-[70px] w-[70px] object-contain"
                  src={item.imageUrl}
                  alt={item.name}
                  width={70}
                  height={70}
                />
                <div>
                  <span>
                    {item.name.length > 30
                      ? item.name.substring(0, 30 - 3) + '...'
                      : item.name}
                  </span>
                  <span style={{ fontWeight: 'bold', marginTop: 5 }}>
                    ${item.price}{' '}
                    <span
                      style={{
                        fontWeight: 'normal',
                        color: 'rgba(0, 0, 0, 0.5)',
                        marginLeft: 4,
                      }}
                    >
                      on amazon
                    </span>
                  </span>
                </div>
              </div>
              {UserState.user && (
                <button onClick={() => removeProductFromWishlist(item)}>
                  <div className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-[#282828]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                      className="h-7 w-7 fill-neutral-800"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!UserState.user && (
        <div className="top-[20px] mb-2 flex flex-col items-center justify-center rounded-sm border border-[rgba(0,_0,_0,_0.1)] bg-white p-1">
          <Image
            className="my-1 ml-auto mr-auto h-[30px] w-[30px]"
            src={require('public/wishlist-heart.png')}
            alt="image"
          />

          <span className="my-2 w-full text-center text-sm">
            Sign in to permanently save products, edit, and access your full
            wishlist from any device.
          </span>
          <button>
            <span className="mt-2 rounded-sm bg-white py-1 text-center font-bold text-[#e01e27]">
              Sign in or create an account
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
