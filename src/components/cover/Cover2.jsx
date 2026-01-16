import ImgCanvas from "@/components/ImgCanvas";
import { useEffect, useState } from "react";

export default function Cover({ wedding_data, imgUrl, isTextShow }) {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        if (!utils.isEmpty(wedding_data) && isTextShow) {
            setShowText(true);
        }
    }, [wedding_data, isTextShow]);

    return (
        <div id="cover" className="w-full relative lg:rounded-t-3xl overflow-hidden">
            <h5 className="z-10 w-full pt-80 text-white absolute text-5xl leading-snug font-continuous text-center">
                <p className={`transition-all duration-800 ease-initial ${showText ? 'opacity-100' : 'opacity-0'}`}>{ [wedding_data?.groom_en, wedding_data?.bride_en].join(' & ') }</p>
            </h5>
            <div className="absolute top-0 left-0 w-full h-full bg-transparent z-10"></div>
            <ImgCanvas imgUrl={imgUrl} type="sakura" />
            {/* <div className="text-base whitespace-normal w-full break-all absolute bottom-20 z-10 text-center">
                <h5 className={`mt-2 text-white transition-all duration-800 ease-initial ${showText ? 'opacity-100' : 'opacity-0'}`}>{ [wedding_data?.groom, wedding_data?.bride].join(' · ') }</h5>
                <h5 className="mt-2 text-white"> 소중한 분들을 결혼식에 초대합니다 </h5>
            </div> */}
        </div>
    )
}