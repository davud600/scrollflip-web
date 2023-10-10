import { useArticle } from '@/hooks/article'
import { useUser } from '@/hooks/user'
import { useEffect, useState } from 'react'

type FooterParams = {
  resetSearchInput?: () => void
  screen: string
}

export default function Footer({
  resetSearchInput = () => {
    return
  },
  screen = 'Home',
}: FooterParams) {
  const { UserState } = useUser()
  const { SearchState } = useArticle()
  const [navigatingToHome, setNavigatingToHome] = useState<boolean>(false)

  useEffect(() => {
    if (!navigatingToHome || !!SearchState.search) return

    resetSearchInput()
    setNavigatingToHome(false)
  }, [navigatingToHome])

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 55,
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#144270',
          paddingTop: 10,
          paddingBottom: 10,
          position: 'absolute',
          height: 55,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            marginBottom: 0,
            height: 40,
            width: 60,
            backgroundColor:
              screen === 'Home' ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            borderRadius: 5,
          }}
          onClick={() => {
            SearchState.setSearch('')
            setNavigatingToHome(true)
          }}
        >
          <span>home</span>
        </button>
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            marginBottom: 0,
            height: 40,
            width: 60,
            backgroundColor:
              screen === 'Search' ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            borderRadius: 5,
          }}
          onClick={() => {}}
        >
          <span>home</span>
        </button>
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            marginBottom: 0,
            height: 40,
            width: 60,
            backgroundColor:
              screen === 'Profile' ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            borderRadius: 5,
          }}
          onClick={() => {
            // UserState.user
            //   ? navigation.navigate('Profile')
            //   : navigation.navigate('Sign Up')
          }}
        >
          <span>user</span>
        </button>
      </div>
    </div>
  )
}
