'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useArticle } from '@/hooks/article'

export default function NavbarMenu() {
  const { CategoryState } = useArticle()
  const [isNavEnabled, setIsNavEnabled] = useState<boolean>(false)
  const toggleNav = () => setIsNavEnabled((prevState) => !prevState)

  const setCategory = (category: string) => {
    CategoryState.setCategory(category)
    setIsNavEnabled(false)
  }

  return (
    <>
      {/* Burger icon  */}
      <div className="mx-1 cursor-pointer text-black" onClick={toggleNav}>
        <div className="flex h-7 w-7 items-center justify-center">
          {!isNavEnabled ? (
            <Image
              alt="burger"
              className="h-5 w-5 object-cover"
              src={require('public/burgeri.png')}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
              className="h-7 w-7 fill-neutral-400"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          )}
        </div>
      </div>

      {isNavEnabled && (
        <div
          className="absolute left-0 top-[63px] z-50 w-screen rounded-sm bg-[#faf9f7] p-2 text-black md:left-auto md:w-auto"
          style={{
            boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            filter:
              ' drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 30,
              gap: 40,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span className="my-4 text-lg font-bold">Categories</span>

              <button onClick={() => setCategory('Shopping')}>
                <span style={{ fontSize: 15 }}>Shopping</span>
              </button>
              <button onClick={() => setCategory('Internet Finds')}>
                <span style={{ fontSize: 15 }}>Internet Finds</span>
              </button>
              <button onClick={() => setCategory('TVAndMovies')}>
                <span style={{ fontSize: 15 }}>TV and Movies</span>
              </button>
              <button onClick={() => setCategory('Celebrity')}>
                <span style={{ fontSize: 15 }}>Celebrity</span>
              </button>
              <button onClick={() => setCategory('Sex & Love')}>
                <span style={{ fontSize: 15 }}>Sex & Love</span>
              </button>
              <button onClick={() => setCategory('Community')}>
                <span style={{ fontSize: 15 }}>Community</span>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span className="my-4 text-lg font-bold">About</span>

                <button onClick={() => window.location.replace('newsletter')}>
                  <span style={{ fontSize: 15 }}>Newsletter</span>
                </button>
                <button onClick={() => window.location.replace('privacy')}>
                  <span style={{ fontSize: 15 }}>Privacy Policy</span>
                </button>
                <button>
                  <span style={{ fontSize: 15 }}>@2023 ScrollFlip</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span className="my-4 text-lg font-bold">Account</span>

                <button onClick={() => window.location.replace('profile')}>
                  <span style={{ fontSize: 15 }}>Profile</span>
                </button>
                <button onClick={() => window.location.replace('likes')}>
                  <span style={{ fontSize: 15 }}>Likes</span>
                </button>
                <button>
                  <span style={{ fontSize: 15 }}>@2023 Scrollflip</span>
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 6,
              paddingTop: 10,
              paddingBottom: 20,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <span style={{ fontWeight: 'bold' }}>@2023 Scrollflip</span>
            <span>Press</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Help</span>
            <span>Contact</span>
          </div>
        </div>
      )}
    </>
  )
}
