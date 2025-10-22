import React, { useState, useEffect } from 'react';

export default function Message_P1({ onSave = ()=>{} }) {
    const [inputVisit, setInputVisit] = useState({ nm: "", pw: "", msg: "" });

    const save = () => {
        onSave(inputVisit, (res) => {
            if (res) setInputVisit({ nm: "", pw: "", msg: "" });
        });
    }

    return (
        <div className="p-4 space-y-4 text-start">
            <fieldset className="fieldset">
                <legend className="fieldset-legend opacity-70">이름</legend>
                <input type="text" maxLength={20} autoComplete="off" placeholder="이름을 입력해 주세요" className="input w-full bg-white" value={inputVisit.nm || ''} onChange={(e) => {setInputVisit({...inputVisit, nm: e.target.value});}} />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend opacity-70">비밀번호</legend>
                <input type="password" name="ppp" maxLength={12} placeholder="수정/삭제에 사용할 비밀번호를 입력해 주세요" className="input w-full bg-white" value={inputVisit.pw || ''} onChange={(e) => {setInputVisit({...inputVisit, pw: e.target.value})}} />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend opacity-70">방명록</legend>
                <textarea className="textarea h-24 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={inputVisit.msg || ''} onChange={(e) => {setInputVisit({...inputVisit, msg: e.target.value})}}></textarea>
            </fieldset>
            <button className="btn btn-outline w-full font-thin" onClick={save}>작성하기</button>
        </div>
    )
}