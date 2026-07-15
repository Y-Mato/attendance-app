import Link from "next/link"

export default function NoticeCard() {
    return(
        <div className="bg-white rounded-2xl shadow-md mx-4 p-4 my-4">
        {/* お知らせ画面 */}
            <div className="flex justify-between">
                <div className="font-bold">🔔 お知らせ</div>
                <Link href="/notice" className="text-blue-500 cursor-pointer">一覧へ ＞</Link>
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
    )
}