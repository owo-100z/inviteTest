import { IoIosCall } from "react-icons/io";

export default function About() {
    const groom = "백지원"
    const bride = "이보람"

    const groom_f = "백ㅇㅇ"
    const groom_m = "김ㅇㅇ"

    const bride_f = "이ㅇㅇ"
    const bride_m = "윤ㅇㅇ"

    const groom_tel = "01053830862"
    const bride_tel = "01066763893"

    const groom_img = "https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg";
    const bride_img = "https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg";

    return (
        <>
            <div className="my-4 w-full px-4 flex justify-center items-stretch gap-2">
                <div className="flex-col flex">
                    <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 space-y-4 w-full h-full text-sm">
                        <div className="w-full h-auto aspect-square overflow-hidden rounded-xl shadow-md relative">
                            <img className="rounded-sm object-cover w-full h-full" loading="lazy" decoding="async" data-nimg="fill" src={groom_img} alt="신랑 이미지" />
                        </div>
                        <div className="w-full h-auto text-center flex justify-center">
                            <span className="mr-1 font-semibold opacity-50">신랑</span>
                            <span>{groom}</span>
                            <a href={`tel:${groom_tel}`}><IoIosCall className="text-lg pl-1" /></a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center rounded-xl p-4 space-y-4 w-full h-full text-sm">
                        <div className="w-full h-auto text-center flex justify-center">
                            <span className="opacity-50">{groom_f}·{groom_m}의 아들</span>
                        </div>
                    </div>
                </div>
                <div className="flex-col flex">
                    <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 space-y-4 w-full h-full text-sm">
                        <div className="w-full h-auto aspect-square overflow-hidden rounded-xl shadow-md relative">
                            <img className="rounded-sm object-cover w-full h-full" loading="lazy" decoding="async" data-nimg="fill" src={bride_img} alt="신부 이미지" />
                        </div>
                        <div className="w-full h-auto text-center flex justify-center">
                            <span className="mr-1 font-semibold opacity-50">신부</span>
                            <span>{bride}</span>
                            <a href={`tel:${bride_tel}`}><IoIosCall className="text-lg pl-1" /></a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center rounded-xl p-4 space-y-4 w-full h-full text-sm">
                        <div className="w-full h-auto text-center flex justify-center">
                            <span className="opacity-50">{bride_f}·{bride_m}의 딸</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-10 w-full px-4 flex justify-center items-stretch gap-2">
                <div className="flex-col flex w-full items-center">
                    <button className="btn btn-wide bg-white border-base-300"><span className="opacity-50 font-thin">혼주에게 연락하기</span></button>
                </div>
            </div>
        </>
    )
}