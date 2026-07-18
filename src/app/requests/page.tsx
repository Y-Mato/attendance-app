"use client"

import BottomNav from "../components/BottomNav"
import Link from "next/link"

export default function RequestsPage() {
    return(
        <div className="bg-gray-100 max-w-md mx-auto min-h-screen w-full text-gray-900 pb-20">
            <header className="flex items-center justify-between bg-blue-500 text-white p-4">
                <Link href="/">＜</Link>
                <span>申請</span>
                <span> </span>
            </header>

            <BottomNav />
            


        </div>

    )
}