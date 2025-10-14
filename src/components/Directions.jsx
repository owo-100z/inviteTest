import React, { useState, useEffect } from 'react';
import { FaCar, FaBus, FaTrain } from "react-icons/fa";
import { LuSquareParking } from "react-icons/lu";

export default function Directions() {
    const methods = [
        {
            type: '자차',
            img: <FaCar />,
            method: [
                {detail: '네비게이션 : \'더 세인트\' 검색\n서울 구로구 경인로 662 디큐브시티'},
                {type: '주차안내', detail: '주차장에 주차해주세용', img: <LuSquareParking />},
            ]
        },
        {
            type: '버스',
            img: <FaBus />,
            method: [
                {type: '172(우리은행종로지점 방면)', color: 'text-blue-600/50', detail: '서울광장역 하차 → 데미타스커피 왼쪽 방면 → 도보 5분'}
            ]
        },
        {
            type: '전세버스',
            img: <FaBus />,
            method: [
                {type: '부산', detail: '출발지'},
                {type: '사천', detail: '경유지'}
            ]
        },
        {
            type: '지하철',
            img: <FaTrain />,
            method: [
                {type: '2호선', color: 'text-green-600/50', detail: '서울광장역 하차 → 데미타스커피 왼쪽 방면 → 도보 5분'}
            ]
        },
    ]

    return (
        <>
            {methods.map((v, i) => (
                <div className="leading-8 px-8 pb-8 text-center text-gray-400" key={i}>
                    <div className="flex py-2 items-center">
                        {v.img && (v.img)}
                        <span className="font-semibold pl-2">{v.type}</span>
                    </div>
                    {v.method.map((m, j) => (
                        <div className="py-4 text-start text-sm" key={j}>
                            <span className='flex items-center gap-2'>
                                {m.img && (m.img)}
                                {m.type && (
                                    (<strong className={m.color || ''}>{m.type}</strong>)
                                )}
                            </span>
                            {m.detail && m.detail.split('\n').map((t, k) => (
                                <p key={k}>{t}</p>
                            ))}
                        </div>
                    ))}
                    <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full bg-black opacity-10" />
                </div>
            ))}
        </>
    )
}