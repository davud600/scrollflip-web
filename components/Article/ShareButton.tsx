import { useState } from 'react'
import Modal from '../Shared/Modal'

type ShareButtonProps = {
  articleLink: string
}

export default function ShareButton({ articleLink }: ShareButtonProps) {
  const [copiedText, setCopiedText] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const closeModal = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  return (
    <>
      <div className="fixed bottom-0 right-0 md:bottom-5 md:right-5">
        <button
          className="mx-5 my-5 rounded-full bg-gray-200 px-4 py-4"
          onClick={openModal}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
          </svg>
        </button>
      </div>
      <Modal
        open={modalVisible}
        close={closeModal}
        title="Share or Copy"
        contentOutside={
          <div className="flex w-full flex-col gap-3">
            <input
              className="w-full rounded-sm border px-2 py-2 text-neutral-500"
              type="text"
              disabled
              value={articleLink}
            />
            <div className="flex">
              <button
                className="mb-2 mr-4 rounded-sm bg-[#144270] px-4 py-2 text-white"
                onClick={() => {
                  void navigator.clipboard.writeText(articleLink)
                  setCopiedText(true)
                }}
              >
                {copiedText ? 'Copied' : 'Copy Link'}
              </button>
            </div>
          </div>
        }
      />
    </>
  )
}
