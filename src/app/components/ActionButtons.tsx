export default function ActionButtons({
    checkInTime, 
    checkOutTime, 
    breakStartTime, 
    breakEndTime,
    setCheckInTime, 
    setCheckOutTime, 
    setBreakStartTime, 
    setBreakEndTime, 
    getNowString
}: {
    checkInTime: string
    checkOutTime: string
    breakStartTime: string
    breakEndTime: string
    setCheckInTime: (value: string) => void
    setCheckOutTime: (value: string) => void
    setBreakStartTime: (value: string) => void
    setBreakEndTime: (value: string) => void
    getNowString: () => string
}) {
    return(
        <>
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
        </>
    )
}