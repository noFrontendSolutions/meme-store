import React, { useState } from "react"
import ErrorDisplay from "../ErrorDisplay"

const SignUpInputs = ({
  credentials,
  setCredentials,
  error,
  setError,
}: {
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>
  error: any
  setError: React.Dispatch<React.SetStateAction<any>>
}) => {
  const [avatarFileName, setAvatarFileName] = useState("")

  return (
    <>
      <label htmlFor="first-name">First Name:</label>
      <input
        type="text"
        name="first-name"
        value={credentials?.first_name ? credentials?.first_name : ""}
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, first_name: e.target.value })
        }
      />
      {error?.firstName && (
        <ErrorDisplay errorMessage={error.firstName} setError={setError} />
      )}
      <label htmlFor="last-name">Last Name:</label>
      <input
        type="text"
        name="last-name"
        value={credentials?.last_name ? credentials?.last_name : ""}
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, last_name: e.target.value })
        }
      />
      {error?.lastName && (
        <ErrorDisplay errorMessage={error.lastName} setError={setError} />
      )}
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        value={credentials?.email ? credentials?.email : ""}
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      {error?.email && (
        <ErrorDisplay errorMessage={error.email} setError={setError} />
      )}
      <div className="flex items-center my-2">
        <label
          htmlFor="avatar-image"
          className="w-[60%] cursor-pointer flex flex-row justify-center items-center p-2 text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300"
        >
          Select Avatar
          <input
            id="avatar-image"
            title="Chose Avatar Image..."
            onChange={(e) => {
              setCredentials({
                ...credentials,
                avatar: e.target.files[0],
                avatar_url: e.target.files[0].name,
              })
              setAvatarFileName(e.target.files[0].name)
              //console.log(credentials)
            }}
            type="file"
            className="hidden"
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-8 w-8 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </span>
        </label>
        {avatarFileName ? (
          <span className="ml-2 p-2 w-[40%] text-center bg-slate-900 rounded">
            {avatarFileName}
          </span>
        ) : (
          <span className="ml-2 p-2 w-[40%] text-center bg-slate-900 rounded">
            Choose Avatar Image (opt.)
          </span>
        )}
      </div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="first-name"
        value={credentials?.password ? credentials?.password : ""}
        className="custom-input"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      {error?.password && (
        <ErrorDisplay errorMessage={error.password} setError={setError} />
      )}
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        name="confirm-password"
        value={
          credentials?.password_confirmation
            ? credentials?.password_confirmation
            : ""
        }
        className="custom-input"
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password_confirmation: e.target.value,
          })
        }
      />
      {error?.confirmation && (
        <ErrorDisplay errorMessage={error.confirmation} setError={setError} />
      )}
    </>
  )
}

export default SignUpInputs

interface Credentials {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  avatar_url?: string
  avatar?: File | null
}
