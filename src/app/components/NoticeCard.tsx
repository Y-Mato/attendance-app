"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

export default function NoticeCard() {
    const [latestNotice,  setLastNotice] = useState<{title: string, created_at: string} | null>(null)

    useEffect(() => {
        async function loadLatestNotice() {
            const { data } = await supabase
                .from("notices")
                .select("title, created_at")
                .order("created_at", {ascending: false})
                .limit(1)
                .maybeSingle()
            setLastNotice(data)

        }
        loadLatestNotice()
    }, [])

    function formatDate(dateStr: string) {
        const d = new Date(dateStr)
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, "0")
        const dd = String(d.getDate()).padStart(2, "0")
        return `${yyyy}/${mm}/${dd}`
    }

    return(
        <div className="bg-white rounded-2xl shadow-md mx-4 p-4 my-4">
        {/* お知らせ画面 */}
            <div className="flex justify-between">
                <div className="font-bold">🔔 お知らせ</div>
                <Link href="/notice" className="text-blue-500 cursor-pointer">一覧へ ＞</Link>
            </div>
            {latestNotice && (
                <>
                    <div className="my-4 text-sm text-gray-500">
                        {formatDate(latestNotice.created_at)}
                        <span className="inline-block bg-blue-500 text-white rounded-full px-4 py-1 mx-2 ">
                        お知らせ
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-sm">
                        {latestNotice.title}
                        </div>
                        <div className="text-sm">＞</div>
                    </div>
                </>
            )}
            
        </div>
    )
}