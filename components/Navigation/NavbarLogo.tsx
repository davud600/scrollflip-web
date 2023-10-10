'use client'

import Image from 'next/image'

export default function HeaderLogo() {
  return (
    <button
      onClick={() => {
        window.location.replace('/')
      }}
    >
      <Image
        className="h-auto w-[8rem] object-scale-down"
        src={require('public/scrollflip-logo.png')}
        alt="logo"
      />
    </button>
  )
}
