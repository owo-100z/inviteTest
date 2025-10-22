import React, { useState, useEffect } from 'react';

export default function Message_P1({ visits = [], onSave = ()=>{}, onDelete = ()=>{} }) {
    const [inputVisit, setInputVisit] = useState({ nm: "", pw: "", msg: "" });
    const [mode, setMode] = useState('view');

    const pop = (type, idx) => {
        if ('mod|del'.indexOf(type) < 0) return;

        // 입력값 초기화
        setInputVisit(visits[idx]);
        document.getElementById(`${type}_pop`).showModal();
    }

    const save = () => {
        onSave(inputVisit, (res) => {
            if (res) setInputVisit({ nm: "", pw: "", msg: "" });
        });
    }

    const del = () => {
        onDelete(inputVisit, (res) => {
            if (res) setInputVisit({ nm: "", pw: "", msg: "" });
        })
    }

    return (
        <>
            <div className="p-4 space-y-4 text-start">
                {visits && visits.length > 0 ? visits.map((v, i) => (
                    <div key={i} className="card w-full shadow-sm border border-gray-200">
                        <div className="card-body">
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center space-x-2'>
                                    <h2 className={`card-title ${v.nm?.length > 15 ? 'text-[0.6rem]' : v.nm?.length > 10 ? 'text-xs' : ''}`}>{v.nm}</h2>
                                </div>
                                <div className="card-actions">
                                    <span className="badge badge-sm badge-outline opacity-50 cursor-pointer" onClick={() => {pop('mod', i)}}>수정</span>
                                    <span className="badge badge-sm badge-outline opacity-50 cursor-pointer" onClick={() => {pop('del', i)}}>삭제</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 whitespace-pre-line mt-2 break-words">{v.msg}</p>

                            <p className="text-xs text-gray-400 text-right">{v.updated_at}</p>
                        </div>
                    </div>
                )) : (
                    <div className="h-24 border-2 border-dashed rounded-lg flex justify-center items-center text-gray-300">
                        <span>방명록을 작성해 주세요 :)</span>
                    </div>
                )}
            </div>
            {/* 수정 모달 */}
            <dialog id="mod_pop" className="modal">
                <div className="modal-box max-w-sm mx-auto">
                    <h3 className="font-bold text-lg">방명록 수정</h3>
                    <div className="modal-body p-4 text-start w-full">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend opacity-70">이름</legend>
                            <input type="text" autoComplete="off" maxLength={20} placeholder="이름을 입력해 주세요" className="input w-full bg-white" value={inputVisit.nm || ''} onChange={(e) => {setInputVisit({...inputVisit, nm: e.target.value});}} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend opacity-70">비밀번호</legend>
                            <input type="password" name="ppp" maxLength={12} placeholder="비밀번호를 입력해 주세요." className="input w-full bg-white" value={inputVisit.pw || ''} onChange={(e) => {setInputVisit({...inputVisit, pw: e.target.value})}} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend opacity-70">방명록</legend>
                            <textarea className="textarea h-24 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={inputVisit.msg || ''} onChange={(e) => {setInputVisit({...inputVisit, msg: e.target.value})}}></textarea>
                        </fieldset>
                    </div>
                    <button className='btn w-full bg-gray-300' onClick={save}>수정</button>
                    <form method="dialog">
                        <button id="mod_pop-close" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
                {/* ESC or 배경 클릭시 팝업 close */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            {/* 삭제 모달 */}
            <dialog id="del_pop" className="modal">
                <div className="modal-box max-w-sm">
                    <h3 className="font-bold text-lg">방명록 삭제</h3>
                    <div className="modal-body p-4 text-start w-full">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend opacity-70">비밀번호</legend>
                            <input type="password" name="ppp" maxLength={12} placeholder="비밀번호를 입력해 주세요." className="input w-full bg-white" value={inputVisit.pw || ''} onChange={(e) => {setInputVisit({...inputVisit, pw: e.target.value})}} />
                        </fieldset>
                    </div>
                    <button className='btn w-full bg-red-200' onClick={del}>삭제</button>
                    <form method="dialog">
                        <button id="del_pop-close" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
                {/* ESC or 배경 클릭시 팝업 close */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}