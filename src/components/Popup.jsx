import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";

let scrollY = 0;

export default function Popup({ onClose, children, title="", full=true }) {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setPosition();
        setShowPopup(true);
    }, []);

    const setPosition = () => {
        const y = window.scrollY;
        scrollY = y;

        if (scrollY === 0) return;

        document.body.style.position = "fixed";
        document.body.style.top = `-${y}px`;
    }

    const close = () => {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
        setShowPopup(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }

    return createPortal(
        <>
            {/* 배경 */}
            <div
                className={`fixed inset-0 bg-black/70 z-[999] transition-opacity duration-200 ${
                    showPopup ? "opacity-100" : "opacity-0"
                }`}
                onClick={close} // 배경 클릭 시 닫기
            />
            <div
                className={`fixed inset-0 flex items-center justify-center text-center z-[999] w-full h-full max-w-md mx-auto lg:w-[400px] duration-200 ease-initial
                        ${showPopup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-50" }`
                }
            >
                <div
                    className={`bg-white p-6 w-full overflow-y-auto ${full ? "h-full" : "h-[50vh] max-h-[80vh] rounded-lg"}`}
                    style={{ scrollbarWidth: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="h-3 flex">
                        <div className="flex w-full h-full justify-end items-center gap-2">
                            {title && (
                                <h2 className={`duration-300 ease-in w-full font-semibold pl-9 text-lg
                                    ${showPopup ? "opacity-70 translate-y-0" : "opacity-0 translate-y-5" }`}
                                >
                                    {title}
                                </h2>
                            )}
                            <button id="_popup_close" onClick={close} className={`z-[1000] cursor-pointer ${title ? "self-center" : "self-end"}`}>
                                <HiX className="text-2xl opacity-50" />
                            </button>
                        </div>
                    </div>
                    {title && <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-5 bg-black opacity-10" />}
                    <div className={`duration-300 ease-in
                        ${showPopup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5" }`}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>,document.body
    );
}