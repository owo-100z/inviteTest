import Container from "@/components/Container"
import React, { act, useState } from "react";

export default function Notice({ wedding_data }) {
    // const title = "안내사항"
    const titles = wedding_data?.ntcTitle;
    const descriptions = wedding_data?.notice;

    const [activeTab, setActiveTab] = useState(0);
    const [fade, setFade] = useState(false);
    const [direction, setDirection] = useState(false);

    const tabClick = (i) => {
        if (activeTab === i) return;

        setDirection(activeTab > i ? true : false);

        setFade(true);
        setTimeout(() => {
            setActiveTab(i);
            setDirection((d) => !d);
            setFade(false);
        }, 300);
    }
    
    return (
        <div className="w-full max-w-md mx-auto">
            {/* Tabs */}
            <div className="tabs tabs-boxed mb-4 flex justify-around px-5">
                {titles && titles.map((v, i) => (
                    <button key={i} className={`tab rounded-xl ${activeTab === i ? "tab-active bg-red-500/5" : ""}`} onClick={() => tabClick(i)} >
                        <span className="font-ongle text-xl">{v}</span>
                    </button>
                ))}
            </div>
            <div className="px-8">
                <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-5 bg-black opacity-10" />
            </div>

            {/* Tab Content */}
            <div className={`min-h-40 duration-400 ease-initial transition-all ${fade ? `opacity-0 ${direction ? 'translate-x-5' : '-translate-x-5'}` : "opacity-100 translate-x-0"}`}>
                {descriptions && descriptions.map((v, i) => (
                    activeTab === i && (
                        <React.Fragment key={i}>
                            <Container description={v?.split('\n')} text_css="px-8" />
                        </React.Fragment>
                    )
                ))}
            </div>
        </div>
    )
}