import { useState } from "react";
import { IoIosCall, IoMdCopy } from "react-icons/io";

export default function Location({ wedding_data }) {
    const weddingPlace = wedding_data?.wedding_place;
    const telnum = wedding_data?.wedding_attract?.replace(/[^0-9]/g, '');
    const address = wedding_data?.wedding_address;
    const sketch_map = '/images/thesaint.png';

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            comm.toast('주소가 복사되었습니다.');
        }).catch((err) => {
            comm.error('복사 실패: ', err);
        })
    };

    const sketch_map_open = () => {
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
            {sketch_map && (
                <div className="pt-10">
                    <span className="underline cursor-pointer" onClick={sketch_map_open}>약도 보기</span>
                </div>
            )}
        </div>
    )
}