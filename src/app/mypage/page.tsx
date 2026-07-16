"use client"

import {useRouter} from "next/navigation"
import {supabase} from "../lib/supabase"

export default function MypagePage() {
    const router = useRouter()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push("/login")
    }

    return(
        <div className="p-4">
            <p className="text-xl font-bold">マイページ</p>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2">
                ログアウト
            </button>
        </div>
    )
}