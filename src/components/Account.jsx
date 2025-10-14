import React, { useState, useEffect } from 'react';

export default function Account() {
    const groom_accounts = [
        {
            title: "신랑",
            bank: "농협",
            number: "302-0329-0745-51",
            name: "백지원",
        },
        {
            title: "신랑 아버지",
            bank: "농협",
            number: "302-0329-0745-51",
            name: "백ㅇㅇ",
        },
        {
            title: "신랑 어머니",
            bank: "농협",
            number: "302-0329-0745-51",
            name: "김ㅇㅇ",
        },
    ];
    const bride_accounts = [
        {
            title: "신부",
            bank: "농협",
            number: "111-111-111111",
            name: "이보람",
        },
        {
            title: "신부 아버지",
            bank: "농협",
            number: "111-111-111111",
            name: "이ㅇㅇ",
        },
        {
            title: "신부 어머니",
            bank: "농협",
            number: "111-111-111111",
            name: "윤ㅇㅇ",
        },
    ];

    useEffect(() => {

    }, []);

    return (
        <div className="px-2 text-center mb-14">
            <div className="my-12 flex justify-center">
                <p className="tracking-wider px-4 text-2xl font-ongle">마음 전하실 곳</p>
            </div>
            <div className="text-gray-400 px-16 space-y-4 mb-10 leading-7">
                <p className="opacity-80">저희 두 사람의 새로운 시작을 축복해 주시고자 하는 마음이 담긴 축의금은 아래 계좌로 전해주시면 감사하겠습니다.</p>
                <p className="opacity-80">더불어 축의금은 저희 결혼식 준비와 신혼여행에 큰 힘이 될 것입니다.</p>
                <p className="opacity-80">감사합니다.</p>
            </div>
            <div className='px-2 space-y-4'>
                <details className="collapse border-base-300 border">
                    <summary className="collapse-title font-semibold text-left groom-color opacity-70">신랑측</summary>
                    {groom_accounts && (
                        <div className='collapse-content'>
                            {groom_accounts.map((account, index) => (
                                <React.Fragment key={`groom-account-${index}`}>
                                    <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-1 bg-black opacity-10" />
                                    <div className='justify-between flex w-full items-center gap-4'>
                                        <div className="text-left space-y-2">
                                            <p className="font-semibold groom-color">{account.title}</p>
                                            <p className="font-semibold">{`${account.bank} ${account.number}`}</p>
                                            <p className="opacity-70">예금주: {account.name}</p>
                                        </div>
                                        <button className="btn btn-outline btn-sm w-24 groom-color" key={`groom-account-btn-${index}`}>복사</button>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </details>
                <details className="collapse border-base-300 border">
                    <summary className="collapse-title font-semibold text-left bride-color opacity-70">신부측</summary>
                    {bride_accounts && (
                        <div className='collapse-content'>
                            {bride_accounts.map((account, index) => (
                                <React.Fragment key={`bride-account-${index}`}>
                                    <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full my-1 bg-black opacity-10" />
                                    <div className='justify-between flex w-full items-center gap-4'>
                                        <div className="text-left space-y-2">
                                            <p className="font-semibold bride-color">{account.title}</p>
                                            <p className="font-semibold">{`${account.bank} ${account.number}`}</p>
                                            <p className="opacity-70">예금주: {account.name}</p>
                                        </div>
                                        <button className="btn btn-outline btn-sm w-24 bride-color" key={`bride-account-btn-${index}`}>복사</button>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </details>
            </div>
        </div>
    )
}