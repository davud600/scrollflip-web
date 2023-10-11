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
          <div className="flex w-[100%] flex-col justify-center gap-2">
            <input
              className="w-full rounded-sm border px-2 py-2 text-neutral-500"
              type="text"
              disabled
              value={articleLink}
            />
            <div className="flex items-center gap-4">
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
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=https%3A//${articleLink}`,
                    '_blank'
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#144270"
                  height="1.5em"
                  viewBox="0 0 320 512"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=https%3A//${articleLink}`,
                    '_blank'
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#144270"
                  height="1.5em"
                  viewBox="0 0 512 512"
                >
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </button>
            </div>
          </div>
        }
      />
    </>
  )

  // return (

  // )

  //     {modalVisible && (
  //       <div className="fixed inset-0 z-50 flex items-center justify-center">
  //         <div className="w-80 rounded-lg bg-white p-4 md:w-96">
  //           <div className="flex flex-col items-center space-y-4">
  //             <span className="text-lg font-medium">Share Article</span>
  //             <input
  //               className="w-full rounded-lg border border-gray-300 px-3 py-2"
  //               disabled
  //               type="text"
  //               value={articleLink}
  //             />
  //             <div className="flex space-x-4">
  //               <button
  //                 className={`rounded-lg px-4 py-2 ${
  //                   copiedText
  //                     ? 'bg-green-500 text-white'
  //                     : 'bg-blue-500 text-white'
  //                 }`}
  //                 onClick={() => {
  //                   void navigator.clipboard.writeText(articleLink)
  //                   setCopiedText(true)
  //                 }}
  //               >
  //                 {copiedText ? 'Copied' : 'Copy Link'}
  //               </button>
  //               <button
  //                 onClick={() => {
  //                   window.open(
  //                     `https://www.facebook.com/sharer/sharer.php?u=https%3A//${articleLink}`,
  //                     '_blank'
  //                   )
  //                 }}
  //                 className="rounded-lg bg-blue-500 px-4 py-2 text-white"
  //               >
  //                 Share on Facebook
  //               </button>
  //               <button
  //                 onClick={() => {
  //                   window.open(
  //                     `https://twitter.com/intent/tweet?text=https%3A//${articleLink}`
  //                   )
  //                 }}
  //                 className="rounded-lg bg-blue-500 px-4 py-2 text-white"
  //               >
  //                 Share on Twitter
  //               </button>
  //             </div>
  //           </div>
  //           <button
  //             className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
  //             onClick={closeModal}
  //           >
  //             <svg
  //               className="h-5 w-5"
  //               xmlns="http://www.w3.org/2000/svg"
  //               viewBox="0 0 20 20"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M13.293 6.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L12 7.414 7.707 11.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0z"
  //                 clipRule="evenodd"
  //               />
  //             </svg>
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // )
}
// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     width: IS_ON_DESKTOP ? '30%' : '80%',
//     height: IS_ON_DESKTOP ? '20%' : '30%',
//     padding: 20,
//     elevation: 10,
//   },
//   modalText: {
//     lineHeight: 30,
//     flex: 1,
//     justifyContent: 'flex-start',
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   closeButton: {
//     backgroundColor: '#144270',
//     paddingVertical: 10,
//     marginVertical: 20,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   loginLinkText: {
//     textDecorationLine: 'underline',
//     fontSize: 17,
//     lineHeight: 25,
//     color: '#144270',
//   },
//   copyButton: {
//     marginTop: 20,
//     borderRadius: 5,
//   },
//   copyButtonText: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   inputStyle: {
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 15,
//     marginTop: 20,
//     borderRadius: 5,
//   },
//   parentCopydiv: {
//     display: 'flex',
//     flexDirection: 'row',
//     paddingVertical: 10,
//     gap: 25,
//   },
//   iconButton: {
//     backgroundColor: 'transparent',
//     paddingVertical: 10,
//     marginTop: 20,
//     borderRadius: 5,
//   },
// })
