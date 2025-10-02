import React, { useRef, useState, useEffect } from "react";

export default function Box({ children, idx = 0, title, className="" }) {
    const boxRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 화면에 들어왔을 때 보이기
                    setVisible(true);
                } else {
                    // 화면에서 벗어나면 사라지기
                    if (boxRef.current) {
                        const rect = boxRef.current.getBoundingClientRect();
                        const y = window.scrollY;
                        const curr = rect.top + y;

                        // 화면 아래로 내려갔을때는 그대로 두기
                        if ( curr <= y ) return;
                    }
                    setVisible(false);
                }
                });
            },
            {
                threshold: 0.2, // 화면에 20% 들어오면 보이기/숨기기
            }
        );

        if (boxRef.current) {
            observer.observe(boxRef.current);
        }

        return () => {
            if (boxRef.current) observer.unobserve(boxRef.current);
        };
    }, []);

    return (
        <div ref={boxRef} className={`transition-all duration-1500 ease-initial ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
            w-full h-full break-keep ${idx % 3 === 0 ? 'bg-base' : (idx % 3 === 1 ? 'bg-base-100/50' : 'bg-base-100')} ${className}`}>
            {title && (
                <div className="px-4 py-12 flex justify-center">
                    <p className="tracking-wider px-4 text-6xl font-loving">{title}</p>
                </div>
            )}
            { children }
        </div>
    )
}