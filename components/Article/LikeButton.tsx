import { useUser } from '@/hooks/user'
import { Article } from '@/types/article.types'
import { showMessage } from '@/utils/alerts'
import { useState } from 'react'
import UniversalModal from '../Shared/Modal'

type LikeButtonProps = {
  article: Article
}

export default function LikeButton({ article }: LikeButtonProps) {
  const { UserState, addOrRemoveLikedArticle } = useUser()
  const [authWarningModalOpen, setAuthWarningModalOpen] =
    useState<boolean>(false)

  let isArticleAlreadyLiked = false
  if (UserState.user !== null) {
    const likedArticlesIds = UserState.user.likedArticles.map(
      (likedArticle) => likedArticle.articleId
    )

    if (likedArticlesIds.includes(article._id)) {
      isArticleAlreadyLiked = true
    }
  }

  const [isLiked, setIsLiked] = useState(isArticleAlreadyLiked)

  const handleLikePress = () => {
    if (UserState.user) {
      addOrRemoveLikedArticle(
        {
          likedArticle: !isLiked,
          articleId: article._id,
        },
        (error) => {
          showMessage({
            message: error,
            type: 'danger',
            hideOnPress: true,
          })
        },
        () => {
          setIsLiked((prevLiked) => !prevLiked)
        }
      )
    } else {
      setIsLiked(false)
      setAuthWarningModalOpen(true)
    }
  }

  const closeModal = () => {
    if (authWarningModalOpen) {
      setAuthWarningModalOpen(false)
    }
  }

  const handleLoginLinkPress = () => {
    // Navigate to the 'Log In' screen
  }
  const handleSignUpLinkPress = () => {
    // Navigate to the 'Sign Up' screen
  }

  return (
    <div>
      <UniversalModal
        close={closeModal}
        open={authWarningModalOpen}
        content={
          <span className="mb-20 text-center">
            You have to&nbsp;
            <button onClick={handleLoginLinkPress}>
              <span className="font-medium text-[#144270] underline underline-offset-2">
                Log In
              </span>
            </button>
            &nbsp;or&nbsp;
            <button onClick={handleSignUpLinkPress}>
              <span className="font-medium text-[#144270] underline underline-offset-2">
                Sign Up
              </span>
            </button>
            &nbsp;so we can track and save your favorite articles!
          </span>
        }
      />

      <button
        className="mx-2 bg-transparent px-2 py-2"
        onClick={handleLikePress}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
          className="h-8 w-8 fill-red-500 md:h-6 md:w-6"
        >
          <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
        </svg>
      </button>
    </div>
  )
}
