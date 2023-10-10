'use client'

import { useRouter } from 'next/navigation'
import { useArticle } from '@/hooks/article'
import { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const { SearchState } = useArticle()
  const [searchInput, setSearchInput] = useState<string>(SearchState.search)

  const submitSearch = () => {
    SearchState.setSearch(searchInput.toLocaleLowerCase())
    router.push('/search')
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative flex items-center">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="rounded-full bg-[#f2f2f2] py-1 pl-9 pr-20 text-sm"
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
          className="absolute right-0 rounded-full bg-[#144270] px-3 py-1 text-sm text-white"
          onClick={submitSearch}
        >
          Search
        </button>
      </div>
    </div>
  )
}
