export default function ClockCard({ todayDate, currentTime, status }: 
    {todayDate: string, currentTime: string, status: string}) {

    const badge = {
        before: null,
        working: {text: "勤務中", color: "bg-green-100 text-green-600"},
        break: {text: "休憩中", color: "bg-yellow-100 text-yellow-600"},
        after: {text: "退勤済み", color: "bg-gray-100 text-gray-500"},
    }[status]

    return(
        <>
        <div className="flex justify-between">
            <span> {todayDate} </span>
            <span> 📅カレンダー </span>
        </div>
        <div className="text-center text-gray-500 text-sm">
          現在時刻
        </div>
        <div className="text-center text-4xl font-bold">
          {currentTime}
        </div>
        {badge && (
          <div className="text-center">
                <span className={`inline-block ${badge.color} rounded-full px-3 py-1 text-sm`}>
                    {badge.text}
                </span>
          </div>
        )}
        
      </>
    )
}