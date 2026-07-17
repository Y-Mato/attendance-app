"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
    const pathname = usePathname()
    
    return(
     <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white flex justify-around border-t border-gray-200 py-2">
      <Link href="/" className={`flex flex-col items-center text-xs
      ${pathname === "/" ? "text-blue-500" : "text-gray-500"}`}>
        <span>🏠</span>
        <span>ホーム</span>
      </Link>
      <Link href="/status" className={`flex flex-col items-center text-xs
      ${pathname === "/status" ? "text-blue-500" : "text-gray-500"}`}>
        <span>⏰</span>
        <span>勤怠</span>
      </Link>
      <Link href="/requests" className={`flex flex-col items-center text-xs
      ${pathname === "/requests" ? "text-blue-500" : "text-gray-500"}`}>
        <span>📃</span>
        <span>申請</span>
      </Link>
      <Link href="/reports" className={`flex flex-col items-center text-xs
      ${pathname === "/reports" ? "text-blue-500" : "text-gray-500"}`}>
        <span>📊</span>
        <span>集計</span>
      </Link>
      <Link href="/mypage" className={`flex flex-col items-center text-xs
      ${pathname === "/mypage" ? "text-blue-500" : "text-gray-500"}`}>
        <span>👤</span>
        <span>マイページ</span>
      </Link>
    </div>
    )
}