import ImgCanvas from "@/components/ImgCanvas";
import { TbTriangleFilled } from "react-icons/tb";

export default function Cover({ name_en, name_kr, date, imgUrl }) {
    const day = dayjs(date).format('MMM D, YYYY');
    const time = dayjs(date).format('ddd · hh:mm A');
    const img1 = imgUrl.split(',')[0];
    const img2 = imgUrl.split(',')[1];

    return (
        <div className="w-full min-h-screen lg:min-h-[90vh] relative lg:rounded-t-3xl overflow-hidden">
            <div className="w-full h-full p-10 space-y-5 flex flex-col items-center justify-center">
                <div className="aspect-square w-full h-auto relative shadow-sm rounded-xl">
                    <div className="uppercase absolute bottom-1 -left-1.5 z-20 whitespace-nowrap transform -rotate-90 origin-bottom-left flex items-center">
                        <div className="flex items-center gap-1">
                            <span>{ time }</span>
                        </div>
                    </div>
                    <div className="uppercase absolute top-1 -right-1.5 z-20 whitespace-nowrap transform -rotate-90 origin-top-right flex items-center">
                        <div className="flex items-center gap-2">
                            <div className="rotate-90">
                                <TbTriangleFilled />
                            </div>
                            <div>13A</div>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-transparent z-10"></div>
                    <ImgCanvas imgUrl={img1} />
                </div>
                <div className="absolute -right-[4.5rem] z-20">
                    <div className="relative w-48 h-4 -rotate-90">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                            <span className="inline-block">{ name_en }</span>
                        </div>
                    </div>
                </div>
                <div className="aspect-square w-full h-auto relative shadow-sm rounded-xl">
                    <div className="uppercase absolute bottom-1 -left-1.5 z-20 whitespace-nowrap transform -rotate-90 origin-bottom-left flex items-center">
                        <div className="flex items-center gap-1.5">
                            <span>{ day }</span>
                        </div>
                    </div>
                    <div className="uppercase absolute bottom-1 -right-[5.4rem] z-20 whitespace-nowrap transform -rotate-90 origin-bottom-left flex items-center">
                        <div className="flex items-center gap-2">
                            <div className="rotate-90">
                                <TbTriangleFilled />
                            </div>
                            <div>12A</div>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-transparent z-10"></div>
                    <ImgCanvas imgUrl={img2} type="maple" />
                </div>
            </div>
        </div>
    )
}