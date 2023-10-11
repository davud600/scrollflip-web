import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { useOutsideClickDetector } from '@/hooks/outsideclick'

type UniversalModalProps = {
  open: boolean
  close: () => void
  title?: string
  text?: string
  content?: ReactNode
  contentOutside?: ReactNode
}

export default function UniversalModal({
  open,
  close,
  title,
  text,
  content,
  contentOutside,
}: UniversalModalProps) {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClickDetector(ref, close)

  return !open ? (
    <></>
  ) : (
    <div className="fixed left-0 top-0 h-screen w-screen bg-[#00000040]">
      <div
        ref={ref}
        className="fixed left-1/2 top-1/2 z-50 w-[80%] -translate-x-[50%] -translate-y-[50%] bg-white md:w-[30%]"
      >
        <div className="flex flex-col">
          <div className="flex h-8 w-full items-center justify-between bg-[#1c1b1b]">
            <Image
              src={require('public/favicon.png')}
              className="pl-4"
              alt="logo"
              width={40}
              height={40}
            />
            <button
              onClick={close}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
          <div className="flex h-40 flex-col items-start justify-center px-2 md:px-4">
            <h1 className="py-3 text-2xl font-semibold text-[#Ff5252]">
              {title}
            </h1>
            {(text || content) && (
              <div className="w-full bg-gray-200 p-2">
                <span className="font-light">{text}</span>
                {content}
              </div>
            )}
            {contentOutside}
          </div>
          <hr className="mt-2 md:mt-0" />
          <div className="flex justify-end">
            <button
              onClick={close}
              className="m-4 bg-[#Ff5252] px-6 py-2 text-center text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
