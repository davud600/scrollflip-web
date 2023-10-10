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
          <div className="flex flex-col">
            <input className="" type="text" disabled value={'link.com'} />
            <div className="flex">
              <span>fb</span>
              <span>ig</span>
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
