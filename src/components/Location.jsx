import { useState } from "react";
import { IoIosCall, IoMdCopy } from "react-icons/io";

export default function Location() {
    const [copied, setCopied] = useState(false);

    const weddingPlace = '더 세인트 신도림 41층 파노라마 홀';
    const telnum = "0222112400";
    const address = "서울 구로구 경인로 662 디큐브시티";
    const sketch_map = '/inviteTest/images/thesaint.png';

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);

            // 2초 후 다시 초기화
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("복사 실패:", err);
        }
    };

    const sketch_map_oprn = () => {
        pop_open(<img className="object-cover w-full h-full" src={sketch_map} alt="약도" />, "약도 보기");
    }

    return (
        <div className="leading-5 px-11 text-center text-gray-400">
            <div className="flex flex-col text-center gap-y-2">
                <div className="flex justify-center items-center">
                    <p>{weddingPlace}</p>
                    <a href={`tel:${telnum}`}><IoIosCall className="text-xl pl-1" /></a>
                </div>
                <div className="flex justify-center items-center">
                    <p>{address}</p>
                    <IoMdCopy className="text-xl pl-1 cursor-pointer" onClick={() => handleCopy(address)} />
                </div>
            </div>
            {copied && (
                <div className="toast opacity-40">
                    <div className="alert text-sm">
                        <span>복사되었습니다.</span>
                    </div>
                </div>
            )}
            {sketch_map && (
                <div className="pt-10">
                    <span className="underline cursor-pointer" onClick={sketch_map_oprn}>약도 보기</span>
                </div>
            )}
        </div>
    )
}