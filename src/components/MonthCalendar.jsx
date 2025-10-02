import React, { useState, useEffect } from 'react';
import HeartBadge from '@/components/HeartBadge'

export default function MonthCalendar({ dDay }) {
    const d_day = dayjs(dDay).format('d') === 'Invalid Date' ? dayjs('2026-06-13') : dayjs(dDay);

    const year = d_day.format('YYYY');
    const month = d_day.format('MM');

    const startDay = d_day.startOf('month');
    const empty = startDay.format('d');
    const lastDay = d_day.endOf("month").format('DD');

    const d_day_day = d_day.format('DD');

    return (
        <>
            {Array.from({ length: empty }).map((_, i) => (
                <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: lastDay }).map((_, i) => {
                return d_day_day == i+1 ? (
                    <div key={i} className="flex justify-center">
                        {/* <div className="text-white rounded-full w-8 h-8 flex justify-center items-center bg-[rgb(124,124,124)]">{i+1}</div> */}
                        <HeartBadge>{i+1}</HeartBadge>
                    </div>
                ) : (
                    <div key={i} className={`px-2 py-1 ${utils.isHoliday(year, month, i+1) ? 'text-red-400' : (i+Number(empty))%7 === 6 ? 'opacity-50' : ''}`}>{i+1}</div>
                )
            })}
        </>
    )
}