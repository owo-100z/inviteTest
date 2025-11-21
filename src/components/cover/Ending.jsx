import ImgCanvas from "@/components/ImgCanvas";

export default function Ending({ wedding_data, imgUrl }) {
    const ending = wedding_data?.ending?.split('\n');
    const ending_img = wedding_data?.outro || imgUrl;
    return (
        <div id="ending" className="w-full relative rounded-b-3xl overflow-hidden">
            <h5 className="z-10 w-full pt-15 text-white absolute text-6xl leading-snug px-2 font-loving text-center">
                <p>Thank You</p>
            </h5>
            <ImgCanvas imgUrl={ending_img} type="tuliip" />
            <div className="text-base w-full absolute bottom-20 z-10 text-center px-8 space-y-4 leading-7 font-saeum text-xl">
                {ending && ending.map((e, i) => (
                    e.length > 0 ? (
                        <p key={`ending-${i}`} className="text-white">{e}</p>
                    ) : (
                        <br key={`br-${i}`} />
                    )
                ))}
            </div>
        </div>
    )
}