import React, { useEffect } from "react";

export default function LocationMap() {
    // 카카오맵 -> 지도퍼가기 -> Lender부분 붙여넣기
    // mapWidth: 100%, mapHeight: 100%로 수정
    useEffect(() => {
        new window.daum.roughmap.Lander({
            timestamp: "1759386969985",
            key: "2bjoo34g7yi4",
            mapWidth: "100%",
            mapHeight: "100%",
        }).render();
    }, []);

    const maps = [
        {
            map: '네이버',
            img: '/inviteTest/images/naver-maps.png',
            url: 'https://naver.me/xExWm05A',
        },
        // {
        //     map: 'T MAP',
        //     img: 'https://i.namu.wiki/i/u1lXxuNzJzxLst2GcEYb464H90E65qfeCLGVeifO_KNLSOvZRljVLzcheqietKC10TuA6iQpmkkxy_0S8KNCfU7r-eKu_-2-tgLd5YQNodmYUPFUMfaG3RTfXUdpQaavSfOvX_Q3FvdT2keLfNmhWQ.svg',
        //     url: '',
        // },
        {
            map: '구글맵',
            img: '/inviteTest/images/google-maps.webp',
            url: 'https://maps.app.goo.gl/wMPQZagZKEtaVXHo9',
        },
    ]

    return (
        <>
            <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-5 bg-black opacity-10" />
            <div className="w-full h-103 px-1">
                <div id="daumRoughmapContainer1759386969985" className="root_daum_roughmap root_daum_roughmap_landing"
                    style={{"width": "100%", "height": "100%"}}
                ></div>
            </div>
            <div className="flex flex-row items-center justify-between w-full h-5 space-x-2 text-[0.875em] px-8 py-5">
                {maps.map((v, i) => (
                    <button
                        className="text-center flex-1 flex items-center justify-center gap-2 bg-white px-2 py-3 rounded-md shadow-md cursor-pointer"
                        onClick={() => {window.open(v.url)}}
                        key={i}
                    >
                        <img className="object-cover w-[25px] h-[25px]" src={v.img} />
                        {v.map}
                    </button>
                ))}
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-5 bg-black opacity-10" />
        </>
    )
}