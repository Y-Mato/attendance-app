

export default function BottomNav() {
    return(
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
    )
}