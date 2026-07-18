"use client"

import {useRouter} from "next/navigation"
import {supabase} from "../lib/supabase"
import BottomNav from "../components/BottomNav"
import Link from "next/link"

export default function MypagePage() {
    const router = useRouter()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push("/login")
    }

    return(
        <div className="bg-gray-100 max-w-md mx-auto min-h-screen w-full text-gray-900 pb-20">
            <header className="flex items-center justify-between bg-blue-500 text-white p-4">
                <Link href="/">＜</Link>
                <span>マイページ</span>
                <span> </span>
            </header>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2">
                ログアウト
            </button>

            <BottomNav />
            


        </div>
    )
}