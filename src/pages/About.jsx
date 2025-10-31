import { IoIosCall, IoIosMail } from "react-icons/io";
import Container from "@/components/Container";

export default function About({ wedding_data }) {
    const groom = {
        name: wedding_data?.groom,
        tel: wedding_data?.groom_tel,
        f_name: wedding_data?.groom_f,
        m_name: wedding_data?.groom_m,
        f_tel: wedding_data?.groom_f_tel || wedding_data?.groom_tel,
        m_tel: wedding_data?.groom_m_tel || wedding_data?.groom_tel,
    }
    const bride = {
        name: wedding_data?.bride,
        tel: wedding_data?.bride_tel,
        f_name: wedding_data?.bride_f,
        m_name: wedding_data?.bride_m,
        f_tel: wedding_data?.bride_f_tel || wedding_data?.bride_tel,
        m_tel: wedding_data?.bride_m_tel || wedding_data?.bride_tel,
    }

    const groom_img = "https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg";
    const bride_img = "https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg";

    const introduction = wedding_data?.introduction?.split('\n');

    const start_date = wedding_data?.start_date;
    const loving = utils.getDayDiff(start_date, utils.getToday());

    const parents_call = () => {
        pop_open(
            <div className="my-4 w-full flex justify-center items-stretch gap-3">
                <div className="flex-col flex w-full">
                    <div className="flex flex-col items-center bg-white rounded-xl border border-gray-200 shadow-md p-4 space-y-4 w-full h-full">
                        <div className="w-full h-auto text-center flex justify-center mb-10">
                            <span className={`font-semibold groom-color`}>신랑측</span>
                        </div>
                        <div className="w-full h-auto text-center flex flex-col gap-4">
                            <div className="justify-center items-center">
                                <span className="mr-1 text-sm opacity-50">아버지</span>
                                <span>{groom?.f_name}</span>
                            </div>
                            <div className="w-auto h-auto text-center flex justify-center gap-4">
                                <a href={`tel:${groom?.f_tel?.replace(/[^0-9]/g, '')}`}><IoIosCall className="text-lg groom-color" /></a>
                                <a href={`sms:${groom?.f_tel?.replace(/[^0-9]/g, '')}`}><IoIosMail className="text-lg groom-color" /></a>
                            </div>
                        </div>
                        <div className="w-full h-auto text-center flex flex-col gap-4">
                            <div className="justify-center items-center">
                                <span className="mr-1 text-sm opacity-50">어머니</span>
                                <span>{groom?.m_name}</span>
                            </div>
                            <div className="w-auto h-auto text-center flex justify-center gap-4">
                                <a href={`tel:${groom?.m_tel?.replace(/[^0-9]/g, '')}`}><IoIosCall className="text-lg groom-color" /></a>
                                <a href={`sms:${groom?.m_tel?.replace(/[^0-9]/g, '')}`}><IoIosMail className="text-lg groom-color" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-col flex w-full">
                    <div className="flex flex-col items-center bg-white rounded-xl border border-gray-200 shadow-md p-4 space-y-4 w-full h-full">
                        <div className="w-full h-auto text-center flex justify-center mb-10">
                            <span className="font-semibold bride-color">신부측</span>
                        </div>
                        <div className="w-full h-auto text-center flex flex-col gap-4">
                            <div className="justify-center items-center">
                                <span className="mr-1 text-sm opacity-50">아버지</span>
                                <span>{bride?.f_name}</span>
                            </div>
                            <div className="w-auto h-auto text-center flex justify-center gap-4">
                                <a href={`tel:${bride?.f_tel?.replace(/[^0-9]/g, '')}`}><IoIosCall className="text-lg bride-color" /></a>
                                <a href={`sms:${bride?.f_tel?.replace(/[^0-9]/g, '')}`}><IoIosMail className="text-lg bride-color" /></a>
                            </div>
                        </div>
                        <div className="w-full h-auto text-center flex flex-col gap-4">
                            <div className="justify-center items-center">
                                <span className="mr-1 text-sm opacity-50">어머니</span>
                                <span>{bride?.m_name}</span>
                            </div>
                            <div className="w-auto h-auto text-center flex justify-center gap-4">
                                <a href={`tel:${bride?.m_tel?.replace(/[^0-9]/g, '')}`}><IoIosCall className="text-lg bride-color" /></a>
                                <a href={`sms:${bride?.m_tel?.replace(/[^0-9]/g, '')}`}><IoIosMail className="text-lg bride-color" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            , "혼주에게 연락하기"
        );
    }

    return (
        <>
            <Container title="저희 커플을 소개합니다" description={introduction} text_css="font-saeum text-xl px-8 space-y-1" />
            <div className="flex justify-center">
                <p className="tracking-wider px-4 text-xl font-ongle">함께한 지 <strong className="bride-color">{loving}</strong>일💕</p>
            </div>
            <div className="my-4 w-full px-4 flex justify-center items-stretch gap-2">
                <div className="flex-col flex">
                    <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 space-y-4 w-full h-full text-sm">
                        <div className="w-full h-auto aspect-square overflow-hidden rounded-xl shadow-md relative">
                            <img className="rounded-sm object-cover w-full h-full" loading="lazy" decoding="async" data-nimg="fill" src={groom_img} alt="신랑 이미지" />
                        </div>
                        <div className="w-full h-auto text-center flex justify-center">
                            <span className="mr-1 font-semibold opacity-50 groom-color">신랑</span>
                            <span>{groom?.name}</span>
                            <a href={`tel:${groom?.tel?.replace(/[^0-9]/g, '')}`}><IoIosCall className="text-lg pl-1" /></a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center rounded-xl p-4 space-y-4 w-full h-full text-sm">
                        <div className="w-full h-auto text-center flex justify-center">
                            <span className="opacity-50">{groom?.f_name} · {groom?.m_name}의 아들</span>
                        </div>
                    </div>
                </div>
                <div className="flex-col flex">
                    <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 space-y-4 w-full h-full text-sm">
                        <div className="w-full h-auto aspect-square overflow-hidden rounded-xl shadow-md relative">
                            <img className="rounded-sm object-cover w-full h-full" loading="lazy" decoding="async" data-nimg="fill" src={bride_img} alt="신부 이미지" />
                        </div>
                        <div className="w-full h-auto text-center flex justify-center">
                            <span className="mr-1 font-semibold opacity-50 bride-color">신부</span>
                            <span>{bride?.name}</span>
                            <a href={`tel:${bride?.tel?.replace(/[^0-9]/g, '')}`}><IoIosCall className="text-lg pl-1" /></a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center rounded-xl p-4 space-y-4 w-full h-full text-sm">
                        <div className="w-full h-auto text-center flex justify-center">
                            <span className="opacity-50">{bride?.f_name} · {bride?.m_name}의 딸</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-10 w-full px-4 flex justify-center items-stretch gap-2">
                <div className="flex-col flex w-full items-center">
                    <button className="btn btn-wide bg-white border-base-300" onClick={parents_call}><span className="opacity-50 font-thin">혼주에게 연락하기</span></button>
                </div>
            </div>
        </>
    )
}