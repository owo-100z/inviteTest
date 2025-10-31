import MonthCalendar from "@/components/MonthCalendar"
import Counter from "@/components/Counter"
import Container from "@/components/Container";
import { AiFillHeart } from "react-icons/ai"

export default function Calendar({ wedding_data }) {
    const weddingDate = dayjs(wedding_data?.wedding_date);
    const weddingPlace = wedding_data?.wedding_place;
    const diff = utils.getDayDiff(utils.getToday(), wedding_data?.wedding_date) - 1;

    const description = [weddingDate?.format('YYYY년 M월 D일 ddd요일 | A h시 m분'), weddingPlace];

    const groom = wedding_data?.groom?.substr(1);
    const bride = wedding_data?.bride?.substr(1);

    return (
        <div className="leading-5 px-4">
            <Container title="예식 안내" description={description} text_css="px-4" />
            <div className="w-full px-5">
                <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-8 bg-black opacity-10" />
                <div className="grid grid-cols-7 font-normal text-center gap-y-6">
                    <div className="text-red-400">일</div>
                    <div className="">월</div>
                    <div className="">화</div>
                    <div className="">수</div>
                    <div className="">목</div>
                    <div className="">금</div>
                    <div className="opacity-50">토</div>

                    <MonthCalendar dDay={weddingDate.format('YYYY-MM-DD')} />
                </div>
                <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-8 bg-black opacity-10" />
            </div>
            <div className="flex justify-center my-5">
                <Counter dDay={weddingDate} />
            </div>
            <div className="flex flex-row justify-center mb-16 font-omu">
                <span className="flex tracking-wider px-4 text-lg opacity-70">
                    {groom}<strong className="text-red-500 text-xs p-1 content-center"><AiFillHeart /></strong>{bride} 결혼식이
                    {diff > 0 ? (
                        <>
                            <strong className="text-lg px-1">{diff}일</strong> 남았습니다
                        </>
                    ) : diff === 0 ? (
                        <>
                            <strong className="text-lg px-1">오늘</strong> 진행됩니다
                        </>
                    ) : (
                        <>
                            <strong className="text-lg px-1">종료</strong> 되었습니다
                        </>
                    )}
                </span>
            </div>
        </div>
    )
}