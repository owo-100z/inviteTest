import React, { useState, useEffect } from 'react';
import { FaCar, FaBus, FaTrain, FaWalking } from "react-icons/fa";

const colorClasses = {
  gray: "text-gray-500",
  red: "text-red-500",
  orange: "text-orange-500",
  yellow: "text-yellow-400",
  green: "text-green-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
};

const type = {
    car: <FaCar />,
    bus: <FaBus />,
    train: <FaTrain />,
}

export default function Directions({ wedding_data }) {
    const directionsLink = wedding_data?.directionsLink;
    const useLink = wedding_data?.useDirectionsLink;

    const methods = Object.values(
        wedding_data?.directions?.reduce((acc, cur) => {
            const key = `${cur.type}-${cur.title}`;
            if (!acc[key]) {
                acc[key] = {
                    type: cur.type,
                    title: cur.title,
                    items: []
                };
            }
            acc[key].items.push({
                subTitle: cur.subTitle,
                desc: cur.desc,
                color: cur.color,
            });
            return acc;
        }, {}) || []
    );

    // const methods = [
    //     {
    //         type: '자차',
    //         img: <FaCar />,
    //         method: [
    //             {detail: '네비게이션 : \'더 세인트\' 검색\n서울 구로구 경인로 662 디큐브시티'},
    //             {type: '주차안내', detail: '주차장에 주차해주세용', img: <LuSquareParking />},
    //         ]
    //     },
    //     {
    //         type: '버스',
    //         img: <FaBus />,
    //         method: [
    //             {type: '172(우리은행종로지점 방면)', color: 'text-blue-600/50', detail: '서울광장역 하차 → 데미타스커피 왼쪽 방면 → 도보 5분'}
    //         ]
    //     },
    //     {
    //         type: '전세버스',
    //         img: <FaBus />,
    //         method: [
    //             {type: '부산', detail: '출발지'},
    //             {type: '사천', detail: '경유지'}
    //         ]
    //     },
    //     {
    //         type: '지하철',
    //         img: <FaTrain />,
    //         method: [
    //             {type: '2호선', color: 'text-green-600/50', detail: '서울광장역 하차 → 데미타스커피 왼쪽 방면 → 도보 5분'}
    //         ]
    //     },
    // ]

    return (
        <>
            {useLink && (
                <div className="px-8 pb-2 text-center text-gray-400 text-sm">
                    <button className='btn w-full btn-outline' onClick={() => {window.open(directionsLink)}}>오시는 길 참고 영상</button>
                </div>
            )}
            {methods && methods.map((v, i) => (
                <div className="leading-8 px-8 pb-8 text-start text-gray-400" key={i}>
                    <div className="flex py-2 items-center">
                        {v.type && (type[v.type])}
                        <span className="font-semibold pl-2">{v.title}</span>
                    </div>
                    {v.items && v.items.map((d, di) => (
                        v.type === 'train' && !d.desc ?
                        (<span className={`${di > 0 ? 'ml-2' : ''}`} key={di}>
                            {d.subTitle && (
                                (<strong className={colorClasses[d.color || '']}>{d.subTitle}</strong>)
                            )}
                        </span>) :
                        (<div className="py-2 text-start text-sm" key={di}>
                            <span className='flex items-center gap-2'>
                                {d.subTitle && (
                                    (<strong className={colorClasses[d.color || '']}>{d.subTitle}</strong>)
                                )}
                            </span>
                            {d.desc && d.desc.split('\n').map((t, ti) => (
                                t?.length > 0 ? (<p key={ti} className={t?.substr(0, 1) === '*' ? 'font-semibold' : ''}>{t?.replace(/\*/g, '')}</p>)
                                : <br key={ti} />
                            ))}                            
                        </div>)
                    ))}
                    {/* <div className="py-4 text-start text-sm">
                        <span className='flex items-center gap-2'>
                            {v.subTitle && (
                                (<strong className={v.color || ''}>{v.subTitle}</strong>)
                            )}
                        </span>
                        {v.desc && v.desc.split('\n').map((t, k) => (
                            <p key={k} className='h-5'>{t}</p>
                        ))}
                    </div> */}
                    <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full bg-black opacity-10" />
                </div>
            ))}
        </>
    )
}