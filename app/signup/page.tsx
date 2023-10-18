'use client'

import { useUser } from '@/hooks/user'
import { showMessage } from '@/utils/alerts'
import { useEffect, useState } from 'react'

export default function Signup() {
  const { signUp } = useUser()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [signUpFailed, setSignUpFailed] = useState<boolean>(true)

  useEffect(() => {
    if (!signUpFailed) {
      setTimeout(() => {
        window.location.replace('/login')
      }, 750)

      setSignUpFailed(true)
    }
  }, [signUpFailed])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!!!username || !!!password || !!!confirmPassword || !!!email) {
      showMessage({
        message: 'Please fill out all the required fields!',
        type: 'danger',
      })
      return
    } else if (username.length < 3) {
      showMessage({
        message: 'Username should be 3 characters or longer!',
        type: 'danger',
      })
      return
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage({
        message: 'E-Mail is not valid!',
        type: 'danger',
      })
      return
    } else if (password !== confirmPassword) {
      showMessage({
        message: 'Passwords do not match!',
        type: 'danger',
      })
      return
    } else if (password.length < 8) {
      showMessage({
        message: 'Password should be 8 characters or longer!',
        type: 'danger',
      })
      return
    }

    await signUp(
      { email, password, confirmPassword, username },
      (error) =>
        showMessage({
          message: error,
          type: 'danger',
        }),
      () => {
        showMessage({
          message: 'Account created successfully!',
          type: 'success',
        })
        setSignUpFailed(false)
      }
    )
  }

  return (
    <main>
      <section className="bg-gray-50">
        <div className="mx-auto flex h-screen w-[100%] flex-col items-center justify-center px-6 py-8 md:w-[30%] lg:py-0">
          <div className="w-full rounded-lg border bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create and account
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
                    Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900  placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="John"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
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
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900  placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-600 bg-gray-50  ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-900 "
                    >
                      I accept the{' '}
                      <a
                        className="text-primary-500 font-medium hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className=" focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className=" text-primary-500 font-medium hover:underline"
                  >
                    Login here
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
