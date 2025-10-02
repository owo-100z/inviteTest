import React, { useState, useEffect } from 'react';
import { FaCar } from "react-icons/fa";

export default function Directions() {
    const methods = [
        {
            type: '자차',
            method: [
                {detail: '네비게이션 : \'더 세인트\' 검색\n서울 구로구 경인로 662 디큐브시티'},
            ]
        },
        {
            type: '버스',
            method: [
                {type: '172(우리은행종로지점 방면)', detail: '서울광장역 하차 → 데미타스커피 왼쪽 방면 → 도보 5분'}
            ]
        },
    ]

    return (
        <>
            {methods.map((v, i) => (
                <div className="leading-8 px-8 pb-8 text-center text-gray-400" key={i}>
                    <div class="flex py-2 items-center">
                        <FaCar />
                        <span className="font-semibold pl-2">{v.type}</span>
                    </div>
                    {v.method.map((m, j) => (
                        <div className="py-4 text-start text-sm" key={j}>
                            {m.type && (
                                (<strong>{m.type}</strong>)
                            )}
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