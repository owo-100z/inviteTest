import React, { useEffect, useRef } from "react";

export default function LocationMap({ wedding_data }) {
    const mapContainer = useRef(null);

    const weddingPlace = wedding_data?.wedding_place;
    const weddingDate = dayjs(wedding_data?.wedding_date)?.format('YYYY년 M월 D일 A h시 m분');

    const lat = 37.50931341073843;
    const lng = 126.8897748355872;

    useEffect(() => {
        const position = new window.kakao.maps.LatLng(lat, lng);
        const options = {
            center: position,
            level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer.current, options);

        const markerImageUrl = '/images/marker_p.png';
        const markerImageSize = new kakao.maps.Size(70, 70); // 마커 이미지의 크기
        const markerImageOptions = {
            offset : new kakao.maps.Point(35, 55)// 마커 좌표에 일치시킬 이미지 안의 좌표
        };

		// 마커 이미지를 생성한다
		const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);

        const marker = new kakao.maps.Marker({
		    position: position, // 마커의 좌표
		    image : markerImage, // 마커의 이미지
            clickable: false,
		    map: map // 마커를 표시할 지도 객체
		});

        kakao.maps.event.addListener(map, 'click', function(e) {
            window.open('https://kko.to/laY5yZVbLv');
        });

        const info = `
                    <div style="padding:5px;min-width:150px;background-color: #fee;border:1px solid #ccc;font-size:0.875em;line-height:1.4;border-radius:8px; text-align:center;">
                        <strong>${weddingPlace}❤️</strong><br/>
                        ${weddingDate}<br/><br/>
                        <span style="color: #888;">지도 클릭 시, 카카오맵으로 이동합니다.</span>
                    </div>
                    `;

		const customOverlay = new kakao.maps.CustomOverlay({
			map: map,
			content: info,
			position: new kakao.maps.LatLng(lat, lng),
			xAnchor: 0.5,
			yAnchor: 1.6
		});
    }, [weddingPlace, weddingDate]);

    const maps = [
        {
            map: '네이버',
            img: '/images/naver-maps.png',
            url: 'https://naver.me/xExWm05A',
        },
        {
            map: 'T MAP',
            img: '/images/tmap.svg',
            url: 'tmap://route?goalname=%EB%8D%94%EC%84%B8%EC%9D%B8%ED%8A%B8%EC%9B%A8%EB%94%A9&goalx=126.8897748355872&goaly=37.50931341073843',
        },
        {
            map: '구글맵',
            img: '/images/google-maps.webp',
            url: 'https://maps.app.goo.gl/wMPQZagZKEtaVXHo9',
        },
    ]

    return (
        <>
            <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-5 bg-black opacity-10" />
            <div className="w-full h-80 px-3 pb-3">
                <div style={{ "width": "100%", "height": "100%" }} ref={mapContainer}></div>
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