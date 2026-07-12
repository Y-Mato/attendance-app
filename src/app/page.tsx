"use client"

import { useState, useEffect} from "react"

export default function Home() {

  const [checkOutTime, setCheckOutTime] = useState("-")
  const [checkInTime, setCheckInTime] = useState("-")
  const [breakStartTime, setBreakStartTime] = useState("-")
  const [breakEndTime, setBreakEndTime] = useState("-")

  const [currentTime, setCurrentTime] = useState("--:--:--")

  const [todayDate, setTodayDate] = useState("")

  // 画面が開いたら保存済みの値の読み込む
  useEffect(() => {
    const savedCheckIn = localStorage.getItem("checkInTime")
    const savedCheckOut = localStorage.getItem("checkOutTime")
    const savedBreakStart = localStorage.getItem("breakStartTime")
    const savedBreakEnd = localStorage.getItem("breakEndTime")
    if (savedCheckIn) setCheckInTime(savedCheckIn)
    if (savedCheckOut) setCheckOutTime(savedCheckOut)
    if (savedBreakStart) setBreakStartTime(savedBreakStart)
    if (savedBreakEnd) setBreakEndTime(savedBreakEnd)
  }, [])

    // 状態が変わるたびに保存
  useEffect(() => {
    localStorage.setItem("checkInTime", checkInTime)
    localStorage.setItem("checkOutTime", checkOutTime)
    localStorage.setItem("breakStartTime", breakStartTime)
    localStorage.setItem("breakEndTime", breakEndTime)
  }, [checkInTime, checkOutTime, breakStartTime, breakEndTime])

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
    {/* 3つのアイコンを左、真ん中、右の配置にしpadding=4でアイコンの両橋に余白、青いタグ */}
    <header className="flex items-center justify-between bg-blue-500 text-white p-4">
      
      <span>
          ≡
      </span>
      <span>
          勤怠
      </span>
      <span>
          🔔
      </span>
    </header>
    {/* 挨拶文 */}
    <div className="p-4">
      <p className="text-2xl font-bold">おはようございます！</p>
      <p className="text-gray-600">今日も1日頑張りましょう！</p>
    </div>
    {/* 時間入力画面 */}
    <div className="bg-white rounded-2xl shadow-md mx-4 p-4">
      {/* 左右離れさせる */}
      <div className="flex justify-between">
        <span>
          {todayDate}
        </span>
        <span>
          📅カレンダー
        </span>
      </div>
      <div className="text-center text-gray-500 text-sm">
          現在時刻
      </div>
      <div className="text-center text-4xl font-bold">
          {currentTime}
      </div>
      <div className="text-center">
        <span className="inline-block bg-green-100 text-green-600 rounded-full px-3 py-1 text-sm">
          勤務中
        </span>
      </div>
    
      {/* 4つのアイコンボタンが綺麗に並ぶようにした */}
      <div className="flex justify-between">
        {/* 出勤ボタン */}
        <div className="flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
          checkInTime !== "-" ? "bg-gray-200 cursor-not-allowed" : "bg-blue-100 cursor-pointer"}`}

          onClick={() => {
            if (checkInTime !== "-") return
            setCheckInTime(getNowString())
            }}>
            →
          </div>
          <span className="text-sm mt-1">出勤</span>
          <span className="text-sm text-gray-500">{checkInTime}</span>
        </div>
        {/* 退勤ボタン */}
        <div className="flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
          checkInTime === "-" || checkOutTime !== "-" ? "bg-gray-200 cursor-not-allowed" : "bg-red-100 cursor-pointer"}`}
          onClick = {() => {
            if (checkInTime === "-" || checkOutTime !== "-") return
              setCheckOutTime(getNowString())
            }}>
            →
          </div>
          <span className="text-sm mt-1">退勤</span>
          <span className="text-sm text-gray-500">{checkOutTime}</span> 
        </div>
        {/* 休憩開始ボタン */}
        <div className="flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
            checkInTime === "-" || breakStartTime !== "-" || checkOutTime !== "-" ? 
            "bg-gray-200 cursor-not-allowed" : "bg-yellow-100 cursor-pointer"}`}
          onClick={() => {
            if (checkInTime === "-" || breakStartTime !== "-" || checkOutTime !== "-") return
              setBreakStartTime(getNowString())
            }}>
            ☕️
          </div>
          <span className="text-sm mt-1">休憩開始</span>
          <span className="text-sm text-gray-500">{breakStartTime}</span> 
        </div>
        {/* 休憩終了ボタン */}
        <div className="flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
            breakStartTime === "-" || breakEndTime !== "-" ?
            "bg-gray-200 cursor-not-allowed" : "bg-green-100 cursor-pointer"}`}
          onClick={() => {
            if (breakStartTime === "-" || breakEndTime !== "-") return
              setBreakEndTime(getNowString())
            }}>
            ▶️
          </div>
          <span className="text-sm mt-1">休憩終了</span>
          <span className="text-sm text-gray-500">{breakEndTime}</span> 
        </div>
      </div>

      {checkInTime !== "-" && (
        <div className="text-center border-t border-gray-200 mt-4 pt-4">
        ✅出勤を記録しました ({checkInTime})
        </div>
      )}

    </div>
    {/* 勤務状況画面 */}
    <div className="bg-white rounded-2xl shadow-md mx-4 p-4 my-4">
      <div className="flex justify-between">
        <div className="font-bold"><span className="text-blue-500">| </span>本日の勤務状況</div>
        <div className="text-blue-500 cursor-pointer">詳細を見る ＞</div>
      </div>
      <div className="flex justify-between pt-4">
        <div>🏢勤務予定</div>
        <div>09:00 ~ 17:00</div>
      </div>
      <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
        <div>⏰実績時間</div>
        <div>{formatMinutes(actualMinutes)}</div>
      </div>
      <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
        <div>☕️休憩時間</div>
        <div>{formatMinutes(breakMinutes)}</div>
      </div>
      <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
        <div>⏰残業時間</div>
        <div>{formatMinutes(overTime)}</div>
      </div>
    </div>
    {/* お知らせ画面 */}
    <div className="bg-white rounded-2xl shadow-md mx-4 p-4 my-4">
      <div className="flex justify-between">
        <div className="font-bold">🔔 お知らせ</div>
        <div className="text-blue-500 cursor-pointer">一覧へ ＞</div>
      </div>
      <div className="my-4 text-sm text-gray-500">2025/05/19 
        <span className="inline-block bg-blue-500 text-white rounded-full px-4 py-1 mx-2 ">
          お知らせ
        </span>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">
          5月の勤怠締め日は5/31(土)です。
        </div>
        <div className="text-sm">＞</div>
      </div>
    </div>
    <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white flex justify-around border-t border-gray-200 py-2">
      <div className="flex flex-col items-center text-blue-500 text-xs">
        <span>🏠</span>
        <span>ホーム</span>
      </div>
      <div className="flex flex-col items-center text-gray-500 text-xs">
        <span>⏰</span>
        <span>勤怠</span>
      </div>
      <div className="flex flex-col items-center text-gray-500 text-xs">
        <span>📃</span>
        <span>申請</span>
      </div>
      <div className="flex flex-col items-center text-gray-500 text-xs">
        <span>📊</span>
        <span>集計</span>
      </div>
      <div className="flex flex-col items-center text-gray-500 text-xs">
        <span>👤</span>
        <span>マイページ</span>
      </div>
    </div>
  </div>
         
    
  )
}
