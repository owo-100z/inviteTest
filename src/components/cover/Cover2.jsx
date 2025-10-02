import ImgCanvas from "@/components/ImgCanvas";

export default function Cover({ name_en, name_kr, date, imgUrl }) {
    const day = dayjs(date).format('MMM D, YYYY');
    const time = dayjs(date).format('ddd · hh:mm A');
    
    return (
        <div className="w-full min-h-[100svh] lg:min-h-[90vh] relative lg:rounded-t-3xl overflow-hidden">
            <h5 className="z-10 w-full pt-15 text-white absolute text-6xl leading-snug px-2 font-loving text-center">
                <p>{ name_en }</p>
            </h5>
            <div className="absolute top-0 left-0 w-full h-full bg-transparent z-10"></div>
            <ImgCanvas imgUrl={imgUrl} type="tuliip" className="min-h-[100svh] lg:min-h-[90vh]" />
            <div className="text-base whitespace-normal w-full break-all absolute bottom-20 z-10 text-center">
                <h5 className="mt-2 text-white">{ name_kr }</h5>
                <h5 className="mt-2 text-white"> 소중한 분들을 결혼식에 초대합니다 </h5>
            </div>
        </div>
    )
}