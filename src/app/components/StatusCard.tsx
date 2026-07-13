export default function StatusCard({workedTime, breakTime, overTime}: 
    {workedTime: string, breakTime: string, overTime: string}) {
    return(
        <div className="bg-white rounded-2xl shadow-md mx-4 p-4 my-4">
        {/* 勤務状況画面 */}
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
                <div>{workedTime}</div>
            </div>
            <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                <div>☕️休憩時間</div>
                <div>{breakTime}</div>
            </div>
            <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                <div>⏰残業時間</div>
                <div>{overTime}</div>
            </div>
        </div>
    )
}