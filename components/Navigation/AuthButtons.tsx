'use client'

import { useUser } from '@/hooks/user'
import Link from 'next/link'

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
              logOut()
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
          <Link
            href={'/login'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 2,
              marginLeft: 2,
            }}
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
          </Link>
          <Link
            href={'/signup'}
            className="ml-4 rounded-full bg-[#144270] px-5 py-2 text-sm font-semibold text-white"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  )
}
