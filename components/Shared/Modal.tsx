import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { useOutsideClickDetector } from '@/hooks/outsideclick'

type UniversalModalProps = {
  open: boolean
  close: () => void
  title?: string
  text?: string
  content?: ReactNode
}

export default function UniversalModal({
  open,
  close,
  title,
  text,
  content,
}: UniversalModalProps) {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClickDetector(ref, close)

  return !open ? (
    <></>
  ) : (
    <div ref={ref} className="absolute left-1/2 top-1/2 z-50">
      <div className="bg-[rgba(0, 0, 0, 0.5)] flex items-center justify-center">
        <div className="h-[42%] w-[80%] rounded-sm bg-white md:h-[25%] md:w-[30%]">
          <div className="bg-[rgba(0, 0, 0, 0.88)] flex h-80 items-center justify-between rounded-sm px-20 py-8">
            <div>
              {/* <Image
                className="h-48 w-48 object-scale-down"
                src={require('../../../assets/favicon.png')}
                alt={'sf logo'}
              /> */}
            </div>
            <span>x</span>
          </div>
          <div className="flex flex-col border-b px-48 py-80">
            <span className="font-semibold text-[#e74f4e]">{title}</span>
            <div>
              {!!text && <span>{text}</span>}
              {!!content && content}
            </div>
          </div>
          <div>
            <button>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
