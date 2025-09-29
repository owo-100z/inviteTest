import React, { useState, useEffect } from 'react';
import Calligraphy from "@/components/Calligraphy";

const str = ["We are getting","married"];
// const str = ["Welcome to","our wedding"];
// const str = ["Celebrate","with us"];

export default function Intro() {
    const [fadeOut, setFadeOut] = useState(false);
    useEffect(() => {
        document.body.style.position = "fixed";

        setTimeout(() => {
            setFadeOut(true);
            document.body.style.position = "";
        }, str.length * 1500 + 1000);
    }, []);

    return (
        <div id="intro-area" className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-base-100/85 h-dvh md:h-[95vh] transition-behavior duration-1000 ease-in-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {str && str.map((s, i) => (
                <Calligraphy
                    key={i}
                    id={`intro-${i}`}
                    str={s}
                    fontSize={15}
                    className='rounded-3xl'
                    speed={s.length > 12 ? 100 : 150}
                    delay={1500 * i}
                />
            ))}
        </div>
    )
}