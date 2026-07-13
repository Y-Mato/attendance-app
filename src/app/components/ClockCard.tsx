export default function ClockCard({ todayDate, currentTime }: 
    {todayDate: string, currentTime: string}) {
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
        <div className="text-center">
          <span className="inline-block bg-green-100 text-green-600 rounded-full px-3 py-1 text-sm">
            勤務中
          </span>
        </div>
      </>
    )
}