import React, { useState, useEffect } from 'react';

import Message_P1 from './Message_P1';
import Message_P2 from './Message_P2';

export default function Message() {
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        getVisitList();
    }, []);

    // 방명록 목록 조회
    const getVisitList = async () => {
        try {
            const response = await comm.api('/visit');

            if (response.status === 'success') {
                setVisits(response.data);
            } else {
                setVisits([]);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setVisits([]);
        }
    }

    // 방명록 저장
    const saveVisit = async (data = {}) => {
        // comm.log('data', data);
        
        if (!data.nm || !data.nm.trim()) return alert('이름을 입력해 주세요');
        if (!data.pw || !data.pw.trim()) return alert('비밀번호를 입력해 주세요');
        if (!data.msg || !data.msg.trim()) return alert('메시지를 입력해 주세요');

        try {
            const response = await comm.api('/visit', { method: 'POST', body: data });
            // comm.log('response', response);
            if (response.status === 'success') {
                const message = `방명록이 ${data.id ? '수정' : '등록'}되었습니다.`;
                alert(message);
                getVisitList();
                pop_close();
            } else {
                if (response.message === 'Incorrect password for update') {
                    alert('비밀번호가 다릅니다.');
                } else {
                    alert(`방명록 ${data.id ? '수정' : '등록'}중 오류가 발생하였습니다.`);
                }
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // 방명록 삭제
    const deleteVisit = async (data) => {
        const { id, pw } = data;

        if (!id) return alert('삭제할 방명록이 없습니다.');
        if (!pw || !pw.trim()) return alert('비밀번호를 입력해 주세요');

        try {
            const response = await comm.api(`/visit/${id}`, { method: 'DELETE', body: { pw } });
            // comm.log('response', response);
            if (response.status === 'success') {
                alert('방명록이 삭제되었습니다.');
                getVisitList();
                pop_close();
            } else {
                if (response.message === 'Incorrect password') {
                    alert('비밀번호가 다릅니다.');
                } else {
                    alert('방명록 삭제중 오류가 발생하였습니다.');
                }
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // 방명록 전체 목록
    const messageList = () => {
        pop_open(
            <Message_P2 visits={visits} onSave={(data) => {saveVisit(data);}} onDelete={(id, pw) => {deleteVisit(id, pw);}} />, "방명록 전체보기");
    }

    // 방명록 작성
    const messageWriteT = () => {
        pop_open(<Message_P1 onSave={(data) => {saveVisit(data);}} />, "방명록 작성하기");
    }

    return (
        <div className="px-2 text-center text-gray-400 mb-14">
            <p className="tracking-wider px-4 mb-6">저희 둘에게 따뜻한 방명록을 남겨주세요</p>
            {visits && visits.length > 0 ? visits.slice(0, 3).map((v, i) => (
                <div key={i} className="card w-full shadow-sm border border-gray-200 mb-4">
                    <div className="card-body">
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-2'>
                                <h2 className={`card-title ${v.nm?.length > 15 ? 'text-xs' : v.nm?.length > 10 ? 'text-sm' : ''}`}>{v.nm}</h2>
                            </div>
                            <div className='flex items-end space-x-2'>
                                <p className="text-xs text-gray-400">{v.updated_at}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 text-left mt-2 whitespace-pre-line">
                            <span className='break-words line-clamp-3'>
                                {v.msg}
                            </span>
                            <span className="text-xs text-gray-400 cursor-pointer" onClick={messageList}>
                                {(v.msg.length > 40 || v.msg.split('\n').length > 3) && ' (더보기)'}
                            </span>
                        </p>
                    </div>
                </div>
            )) : (
                <div className={`grid duration-300 ease-initial mx-5`}>
                    <div className="h-24 border-2 border-dashed rounded-lg flex justify-center items-center text-gray-300">
                        <span>방명록을 작성해 주세요 :)</span>
                    </div>
                </div>
            )}
            <div className="flex justify-between mt-6 mx-5">
                <button className="btn btn-outline font-thin" onClick={messageList}>전체보기</button>
                <button className="btn btn-outline font-thin" onClick={messageWriteT}>작성하기</button>
            </div>
        </div>
    )
}