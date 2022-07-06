import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const LoginForm = () => {
  const {
    setLoggedIn,
    setBearerToken,
    setLoginModalIsOpen,
    credentials,
    setCredentials,
    setIsLoading,
    error,
    setError,
    isLoading,
  } = useContext(UserContext)

  return (
    <form action="/login" className="h-full p-4 pt-2 pl-0 flex flex-col">
      <label htmlFor="email" className="font-bold">
        Email:
      </label>
      <input
        type="text"
        name="email"
        placeholder="Email..."
        value={credentials?.email ? credentials?.email : ""}
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      {error?.email && (
        <p className="mb-2 text-red-500 font-bold">{error?.email}</p>
      )}
      <label htmlFor="password" className="font-bold">
        Password:
      </label>
      <input
        type="password"
        name="first-name"
        placeholder="Password..."
        value={credentials?.password ? credentials?.password : ""}
        className="rounded w-full mb-4 mt-2 py-2 px-3 ring-2 ring-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      {error?.password && (
        <p className="mb-2 text-red-500 font-bold">{error?.password}</p>
      )}
      <button
        type="submit"
        className="bg-blue-600 rounded-lg hover:bg-blue-700 font-bold text-xl text-white h-14 mt-8 flex justify-center items-center"
        onClick={(e) => {
          e.preventDefault()
          login(
            "http://127.0.0.1:8000/api/login",
            setLoggedIn,
            setBearerToken,
            credentials,
            setCredentials,
            setIsLoading,
            setError,
            setLoginModalIsOpen
          )
        }}
      >
        {!isLoading && <span>Login</span>}
        {isLoading && (
          <span>
            <svg
              role="status"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </span>
        )}
      </button>
      {error?.message &&
        setTimeout(() => {
          setError({ ...error, message: "" })
        }, 5000) && (
          <p className="mt-2 text-red-500 font-bold">{error?.message}</p>
        )}
    </form>
  )
}

interface Credentials {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

const login = async (
  url: string,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setBearerToken: React.Dispatch<React.SetStateAction<string>>,
  credentials: Credentials,
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setLoginModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true)
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
    const data = await response.json()
    if (response.ok) {
      setCredentials({ ...data.user })
      setBearerToken(data.token)
      localStorage.setItem("bearerToken", data.token)
      localStorage.setItem("id", data.user.id)
      localStorage.setItem("first_name", data.user.first_name)
      localStorage.setItem("last_name", data.user.last_name)
      localStorage.setItem("email", data.user.email)
      setLoggedIn(true)
      setLoginModalIsOpen(false)
    } else {
      if (data.errors) {
        setError({ ...data.errors, message: data.message })
      } else {
        throw new Error("Access denied! Bad Credentials!")
      }
    }
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false)
  }
}

export default LoginForm
