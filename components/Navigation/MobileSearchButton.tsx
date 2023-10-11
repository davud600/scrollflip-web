'use client'

import { useRouter } from 'next/navigation'
import { useArticle } from '@/hooks/article'
import { useState } from 'react'

export default function MobileSearchButton() {
  const router = useRouter()
  const { SearchState } = useArticle()
  const [searchInput, setSearchInput] = useState<string>(SearchState.search)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const submitSearch = () => {
    SearchState.setSearch(searchInput.toLocaleLowerCase())
    router.push('/search')
  }

  return (
    <>
      <button onClick={() => setIsSearching((prevState) => !prevState)}>
        {isSearching ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
            className="h-7 w-7 fill-neutral-400"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className="mt-1 h-6 w-6 fill-neutral-500"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        )}
      </button>

      {isSearching && (
        <div className="fixed left-0 top-[64px] flex w-screen items-center justify-center gap-2 bg-white py-3">
          <div className="relative flex items-center">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              className="text-bas w-[90vw] rounded-full bg-[#f2f2f2] py-1 pl-9 pr-4 text-black"
              placeholder="Search here..."
            />

            <div className="pointer-events-none absolute left-[14px] top-[7px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="h-4 w-4 fill-neutral-400"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
            <button
              className="absolute right-0 rounded-full bg-[#144270] px-4 py-1 text-sm text-white"
              onClick={submitSearch}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </>
  )
}
