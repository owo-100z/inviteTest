import React, { useState, useEffect } from 'react';

export default function Counter({ dDay = dayjs() }) {
    const [counter, setCounter] = useState({
        일: 0,
        시: 0,
        분: 0,
        초: 0,
    });
    const [over, setOver] = useState(false);

    useEffect(() => {
        const targetDate = dDay;
        if (targetDate.diff(dayjs(), 'second') <= 0) {
            setOver(true);
            return;
        }

        const timer = setInterval(() => {
            const diff = targetDate.diff(dayjs(), 'second');

            if (diff <= 0) {
                clearInterval(timer);
                setOver(true);
                return;
            }

            const 일 = Math.floor(diff / (24 * 60 * 60));
            const 시 = Math.floor(diff % (24 * 60 * 60) / (60 * 60));
            const 분 = Math.floor(diff % (60 * 60) / (60));
            const 초 = Math.floor(diff % 60);

            setCounter({ 일, 시, 분, 초 });
        }, 1000);

        return () => clearInterval(timer);
    }, [dDay]);

    return (
        <>
            {over ? (
                <h5 className="w-full text-black text-7xl px-2 font-loving text-center">
                    <p>Congratulations</p>
                </h5>
            ) : (
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                    {['일', '시', '분', '초'].map((unit, i) => (
                        <div key={`unit-${i}`} className="flex flex-col font-paperozi">
                            {unit === '일' ? (
                                <span className="countdown countdown-mod text-4xl">
                                    {String(counter[unit]).split("").map((d, i) => (
                                        <span key={i} style={{"--value":d} } aria-live="polite">{d}</span>
                                    ))}
                                </span>
                            ) : (
                                <span className="countdown text-4xl">
                                    <span style={{"--value":counter[unit]} } aria-live="polite">{counter[unit]}</span>
                                </span>
                            )}
                            <span className='font-omu'>{unit}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}