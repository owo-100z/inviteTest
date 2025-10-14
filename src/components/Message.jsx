import React, { useState, useEffect } from 'react';

export default function Message() {

    useEffect(() => {

    }, []);

    const messageList = () => {
        pop_open(
        <div className="p-4 space-y-4 text-start">
            <div className="h-24 border-2 border-dashed rounded-lg flex justify-center items-center text-gray-300">
                <span>방명록을 작성해 주세요 :)</span>
            </div>
            <div className="card w-full shadow-sm border border-gray-200">
                <div className="card-body">
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-2'>
                            <h2 className="card-title">이름</h2>
                        </div>
                        <div className="card-actions">
                            <span className="badge badge-outline opacity-50 cursor-pointer">수정</span>
                            <span className="badge badge-outline opacity-50 cursor-pointer">삭제</span>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500">
                        <p>내용</p>
                    </div>

                    <div className="text-xs text-gray-400 text-right">
                        <p>2024-01-01 12:00</p>
                    </div>
                </div>
            </div>
        </div>, "방명록 전체보기");
    }

    const messageWrite = () => {
        pop_open(
        <div className="p-4 space-y-4 text-start">
            <fieldset className="fieldset">
                <legend className="fieldset-legend opacity-70">이름</legend>
                <input type="text" placeholder="이름을 입력해 주세요" className="input w-full bg-white" />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend opacity-70">비밀번호</legend>
                <input type="text" placeholder="수정/삭제에 사용할 비밀번호를 입력해 주세요" className="input w-full bg-white" />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend opacity-70">방명록</legend>
                <textarea className="textarea h-24 bg-white w-full" placeholder="메시지를 작성해 주세요"></textarea>
            </fieldset>
            <button className="btn btn-outline w-full font-thin">작성하기</button>
        </div>, "방명록 작성하기");
    }

    return (
        <div className="px-2 text-center text-gray-400 mb-14">
            <p className="tracking-wider px-4 mb-6">저희 둘에게 따뜻한 방명록을 남겨주세요</p>
            <div className={`grid duration-300 ease-initial mx-5`}>
                <div className="h-24 border-2 border-dashed rounded-lg flex justify-center items-center text-gray-300">
                    <span>방명록을 작성해 주세요 :)</span>
                </div>
            </div>
            <div className="flex justify-between mt-6 mx-5">
                <button className="btn btn-outline font-thin" onClick={messageList}>전체보기</button>
                <button className="btn btn-outline font-thin" onClick={messageWrite}>작성하기</button>
            </div>
        </div>
    )
}