"use client"

import BottomNav from "../components/BottomNav"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"


export default function StatusPage() {
    const router = useRouter()
    const [checkInTime, setCheckInTime] = useState("-")
    const [checkOutTime, setCheckOutTime] = useState("-")
    const [breakStartTime, setBreakStartTime] = useState("-")
    const [breakEndTime, setBreakEndTime] = useState("-")
    const [todayDate, setTodayDate] = useState("")


    // ログインチェック＋今日のデータ取得
    useEffect(() => {
        async function load() {
            const { data: sessionData } = await supabase.auth.getSession() 
            // ログインできてなかったらログイン画面へ遷移
            if (!sessionData.session) {
                router.push("/login")
                return
            }
            const userId = sessionData.session.user.id
            const todayISO = new Date().toISOString().slice(0,10)
            const { data } = await supabase
               .from("attendance_records")
               .select("*")
               .eq("user_id", userId)
               .eq("date", todayISO)
               .maybeSingle()
            if (data) {
                setCheckInTime(data.check_in_time ?? "-")
                setCheckOutTime(data.check_out_time ?? "-")
                setBreakStartTime(data.break_start_time ?? "-")
                setBreakEndTime(data.break_end_time ?? "-")
            }
        }
        load()
    }, [])

    // 日付リアルタイム表示
    useEffect(() => {
        const now = new Date()
        const week = ["日", "月", "火", "水", "木", "金", "土"]
        setTodayDate(`${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日(${week[now.getDay()]})`)
    }, [])

    // 今の時刻を"HH:MM"で取得
    function getNowString() {
        const now = new Date()
        const hh = String(now.getHours()).padStart(2, "0")
        const mm = String(now.getMinutes()).padStart(2, "0")
        return hh + ":" + mm
    }

    function toMinutes(timeStr: string) {
        const [h, m] = timeStr.split(":")
        return Number(h) * 60 + Number(m)
    }

    function formatMinutes(totalMinutes: number) {
        const h = Math.floor(totalMinutes / 60)
        const m = totalMinutes % 60
        return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0")
    }

    // チェックインと現在時間からチェックアウトの時間計算
    let workedMinutes = 0
    if (checkInTime !== "-") {
        const end = checkOutTime !== "-" ? checkOutTime : getNowString()
        workedMinutes = toMinutes(end) - toMinutes(checkInTime)
    }
    // 休憩開始と現在時間から休憩終了するまでの時間計算
    let breakMinutes = 0
    if (breakStartTime !== "-") {
        const end = breakEndTime !== "-" ? breakEndTime : getNowString()
        breakMinutes = toMinutes(end) -toMinutes(breakStartTime)
    }
    // 休憩時間を差し引いた実際の労働時間
    const actualMinutes = workedMinutes - breakMinutes
    // 残業時間計算
    const overTime = Math.max(0, workedMinutes - 480)
    //勤務ステータスの判定
    let status = "before"
    if (checkInTime !== "-" && checkOutTime === "-") {
        status = breakStartTime !== "-" && breakEndTime === "-" ? "break" : "working"
    } else if (checkOutTime !== "-") {
        status = "after"
    }

    const badge = {
        before: null,
        working: {text: "勤務中", color: "bg-green-100 text-green-600"},
        break: {text: "休憩中", color: "bg-yellow-100 text-yellow-600"},
        after: {text: "退勤済み", color: "bg-gray-100 text-gray-500"},
    }[status]

    return(
        <div className="bg-gray-100 max-w-md mx-auto min-h-screen w-full text-gray-900 pb-20">

            <header className="flex items-center justify-between bg-blue-500 text-white p-4">
                <span> ＜ </span>
                <span> 本日の勤務状況 </span>
                <span>  </span>
            </header>

            <div className="p-4 text-xl font-bold">
                {todayDate}     
            </div>

            <div className="bg-white rounded-2xl shadow-md mx-4 p-4">
                <div className="flex justify-between">
                    <div>勤務予定</div>
                    <div>09:00 ~ 17:00</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>出勤時刻</div>
                    <div>{checkInTime}</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>退勤時刻</div>
                    <div>{checkOutTime}</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>休憩時間</div>
                    <div>{formatMinutes(breakMinutes)}</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>残業時間</div>
                    <div>{formatMinutes(overTime)}</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>実働時間</div>
                    <div>{formatMinutes(workedMinutes)}</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>ステータス</div>
                    {badge && (
                        <div className={`inline-block ${badge.color} rounded-full px-3 py-1 text-sm`}>
                            {badge.text}
                        </div>
                    )}
                </div>
                
            </div>
            <div className="bg-white rounded-2xl shadow-md mx-4 p-4 my-4">
                <div className="flex justify-between">
                    <div className="text-xl font-bold ">打刻履歴</div>
                    <div> </div>
                </div>
                <div className="flex justify-between my-4">
                    <div>出勤</div>
                    <div>{checkInTime}</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>休憩開始</div>
                    <div>{breakStartTime}</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>休憩終了</div>
                    <div>{breakEndTime}</div>
                </div>
                <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                    <div>退勤</div>
                    <div>{checkOutTime}</div>
                </div>
            </div>

            <BottomNav />
        </div>
      
    )
}