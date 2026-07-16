"use client"

import BottomNav from "./components/BottomNav"
import Header from "./components/Header"
import StatusCard from "./components/StatusCard"
import Greeting from "./components/Greeting"
import NoticeCard from "./components/NoticeCard"
import ClockCard from "./components/ClockCard"
import ActionButtons from "./components/ActionButtons"
import { useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import { supabase } from "./lib/supabase"

export default function Home() {

  const [checkInTime, setCheckInTime] = useState("-")
  const [checkOutTime, setCheckOutTime] = useState("-")
  const [breakStartTime, setBreakStartTime] = useState("-")
  const [breakEndTime, setBreakEndTime] = useState("-")

  const [currentTime, setCurrentTime] = useState("--:--:--")

  const [todayDate, setTodayDate] = useState("")

  const router = useRouter()

  const [userId, setUserId] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)


  // ログインしていなければloginページへ飛ばす
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push("/login")
        return
      }
      setUserId(data.session.user.id)
    }
    checkAuth()
  }, [])

  // 画面が開いたら保存済みの値の読み込む
  useEffect(() => {
    if (!userId) return
    async function loadToday() {
      const todayISO =new Date().toISOString().slice(0,10)
      const {data} = await supabase
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
      setHasLoaded(true)
    }
    loadToday()
  }, [userId])
  



    // 状態が変わるたびに保存
  useEffect(() => {
    if (!userId || !hasLoaded) return
    async function saveToday() {
      const todayISO = new Date().toISOString().slice(0,10)
      const { error } = 
      await supabase.from("attendance_records").upsert({
        user_id: userId,
        date: todayISO,
        check_in_time: checkInTime,
        check_out_time: checkOutTime,
        break_start_time: breakStartTime,
        break_end_time: breakEndTime,
      }, {onConflict: "user_id,date"})
      if (error) {
        console.log("保存エラー:", error)
      }
    }
    saveToday()
  }, [checkInTime, checkOutTime, breakStartTime, breakEndTime, hasLoaded, userId])


  // 現在時刻リアルタイム表示処理
  useEffect(() => {
    const timer = setInterval(() => {
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, "0")
    const mm = String(now.getMinutes()).padStart(2, "0")
    const ss = String(now.getSeconds()).padStart(2, "0")
    setCurrentTime(hh + ":" + mm + ":" + ss)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 日付リアルタイム表示
  useEffect(() => {
    const now = new Date()
    const week = ["日", "月", "火", "水", "木", "金", "土"]
    setTodayDate(`${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日(${week[now.getDay()]})`)
  }, [])

  // ボタンの下の時刻表示処理
  function getNowString(){
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, "0")
    const mm = String(now.getMinutes()).padStart(2, "0")
    return hh + ":" + mm
  }

  function toMinutes(timeStr: string) {
    const [h,m] = timeStr.split(":")
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
    const end = checkOutTime !== "-" ? checkOutTime : currentTime
    workedMinutes = toMinutes(end) - toMinutes(checkInTime)
  }
  // 休憩開始と現在時間から休憩終了するまでの時間計算
  let breakMinutes = 0
  if (breakStartTime !== "-") {
    const end = breakEndTime !== "-" ? breakEndTime : currentTime
    breakMinutes = toMinutes(end) -toMinutes(breakStartTime)
  }
  // 休憩時間を差し引いた実際の労働時間
  const actualMinutes = workedMinutes - breakMinutes
  // 残業時間計算
  const overTime = Math.max(0, workedMinutes - 480)

  return(
  // 画面サイズ色指定、背景灰色
  <div className="bg-gray-100 max-w-md mx-auto min-h-screen w-full text-gray-900 pb-20">

    <Header />

    {/* 挨拶文 */}
    <Greeting />

    {/* 時間入力画面 */}
    <div className="bg-white rounded-2xl shadow-md mx-4 p-4">
      
      <ClockCard 
        todayDate={todayDate}
        currentTime={currentTime}
      />
      
    
      <ActionButtons 
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        breakStartTime={breakStartTime}
        breakEndTime={breakEndTime}
        setCheckInTime={setCheckInTime}
        setCheckOutTime={setCheckOutTime}
        setBreakStartTime={setBreakStartTime}
        setBreakEndTime={setBreakEndTime}
        getNowString={getNowString}
      />
      

    </div>
    
    {/* 勤務状況画面 */}
    <StatusCard 
      workedTime={formatMinutes(actualMinutes)}
      breakTime={formatMinutes(breakMinutes)}
      overTime={formatMinutes(overTime)}
    />

    {/* お知らせ画面 */}
    <NoticeCard />

    <BottomNav />

  </div>
         
    
  )
}
