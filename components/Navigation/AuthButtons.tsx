'use client'

import { useUser } from '@/hooks/user'

export default function AuthButtons() {
  const { UserState, logOut } = useUser()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {UserState.user ? (
        <>
          <button
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 2,
              marginLeft: 2,
            }}
            onClick={() => {
              // logOut(navigation)
            }}
          >
            <span
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              Log Out
            </span>
          </button>
        </>
      ) : (
        <>
          <button
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 2,
              marginLeft: 2,
            }}
            onClick={() => console.log('')}
          >
            <span
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              Log In
            </span>
          </button>
          <button className="ml-4 rounded-full bg-[#144270] px-5 py-2 text-sm font-semibold text-white">
            Sign Up
          </button>
          {/* <Btn
            style={{
              paddingHorizontal: 15,
              paddingBottom: 7,
              paddingTop: 7,
              borderRadius: 50,
              marginLeft: 10,
              // marginRight: IS_ON_DESKTOP
              //   ? Dimensions.get('window').width / 10
              //   : 0,
              borderColor: '#144270',
              borderWidth: 2,
            }}
            onPress={() => navigation.navigate('Sign Up')}
            textStyle={{
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
            }}
            text="Sign Up"
          /> */}
        </>
      )}
    </div>
  )
}
