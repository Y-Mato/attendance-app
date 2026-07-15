"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErrorMessage(error.message)
      return
    }
    router.push("/")
  }

  async function handleSignUp() {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setErrorMessage(error.message)
      return
    }
    router.push("/")
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">
          ログイン
        </button>
        <button type="button" onClick={handleSignUp} className="bg-gray-200 rounded-lg p-2">
          新規登録
        </button>
      </form>
    </div>
  )
}
