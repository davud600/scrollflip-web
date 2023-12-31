'use client'

import { useUser } from '@/hooks/user'
import { showMessage } from '@/utils/alerts'
import { useEffect, useState } from 'react'

export default function Login() {
  const { logIn } = useUser()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [logInFailed, setLogInFailed] = useState<boolean>(true)

  useEffect(() => {
    if (!logInFailed) {
      setTimeout(() => {
        window.location.replace('/')
      }, 750)

      setLogInFailed(true)
    }
  }, [logInFailed])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!!!email || !!!password) {
      showMessage({
        message: 'Please fill out all the required fields!',
        type: 'danger',
        hideOnPress: true,
      })
      return
    } else if (password.length < 8) {
      showMessage({
        message: 'Invalid E-Mail or Password!',
        type: 'danger',
        hideOnPress: true,
      })
      return
    }

    await logIn(
      { email, password },
      (error) =>
        showMessage({
          message: error,
          type: 'danger',
          hideOnPress: true,
        }),
      () => {
        showMessage({
          message: 'Successfully logged in!',
          type: 'success',
          hideOnPress: true,
        })
        setLogInFailed(false)
      }
    )
  }

  return (
    <main>
      <section className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="mx-auto flex h-screen w-[100%] flex-col items-center justify-center px-6 py-8 md:w-[30%] lg:py-0">
          <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="john@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="hover:bg-primary-700 focus:ring-primary-300 bg-primary-600 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Don&apos;t have an account yet?{' '}
                  <a
                    href="/signup"
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
