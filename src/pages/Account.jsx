import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Collapse from '@/components/Collapse';

export default function Account({ wedding_data }) {
    const [open, setOpen] = useState(false);
    const groom_accounts = [
        {
            title: '신랑',
            bank: wedding_data?.groom_bank?.name?.replace('은행', '') || '',
            number: wedding_data?.groom_account || '',
            name: wedding_data?.groom || '',
        },
        {
            title: '신랑 아버지',
            bank: wedding_data?.groom_f_bank?.name?.replace('은행', '') || '',
            number: wedding_data?.groom_f_account || '',
            name: wedding_data?.groom_f || '',
        },
        {
            title: '신랑 어머니',
            bank: wedding_data?.groom_m_bank?.name?.replace('은행', '') || '',
            number: wedding_data?.groom_m_account || '',
            name: wedding_data?.groom_m || '',
        },
    ];
    const bride_accounts = [
        {
            title: '신부',
            bank: wedding_data?.bride_bank?.name?.replace('은행', '') || '',
            number: wedding_data?.bride_account || '',
            name: wedding_data?.bride || '',
        },
        {
            title: '신부 아버지',
            bank: wedding_data?.bride_f_bank?.name.replace('은행', '') || '',
            number: wedding_data?.bride_f_account || '',
            name: wedding_data?.bride_f || '',
        },
        {
            title: '신부 어머니',
            bank: wedding_data?.bride_m_bank?.name.replace('은행', '') || '',
            number: wedding_data?.bride_m_account || '',
            name: wedding_data?.bride_m || '',
        },
    ];

    const notice = wedding_data?.account_anounce?.split('\n');

    useEffect(() => {

    }, []);

    return (
        <div className="px-2 text-center mb-14">
            <Container title="마음 전하실 곳" description={notice} text_css="font-saeum text-2xl px-12 space-y-1" />
            <div className='px-2 space-y-4'>
                <Collapse title="신랑측" color="groom-color opacity-80">
                    {groom_accounts?.map((account, index) => (
                        <div key={index} className="justify-between flex w-full items-center border-t border-base-300">
                            <div className="p-3 text-start">
                                <p className="font-semibold groom-color">{account.title}</p>
                                <p>{`${account.bank} ${account.number}`}</p>
                                <p className="opacity-70">예금주: {account.name}</p>
                            </div>
                            <button key={`groom-account-btn-${index}`}
                                    className="btn btn-outline btn-sm w-24 groom-color mr-1"
                                    onClick={() => {navigator.clipboard.writeText(account.number?.replace(/[^0-9]/g, '')).then(()=>{
                                        comm.toast('계좌번호가 복사되었습니다.');
                                    }).catch((err)=>{comm.error('오류발생: ', err)})}}>
                                복사
                            </button>
                        </div>
                    ))}
                </Collapse>
                <Collapse title="신부측" color="bride-color opacity-80">
                    {bride_accounts?.map((account, index) => (
                        <div key={index} className="justify-between flex w-full items-center border-t border-base-300">
                            <div className="p-3 text-start">
                                <p className="font-semibold bride-color">{account.title}</p>
                                <p>{`${account.bank} ${account.number}`}</p>
                                <p className="opacity-70">예금주: {account.name}</p>
                            </div>
                            <button key={`bride-account-btn-${index}`}
                                    className="btn btn-outline btn-sm w-24 bride-color mr-1"
                                    onClick={() => {navigator.clipboard.writeText(account.number?.replace(/[^0-9]/g, '')).then(()=>{
                                        comm.toast('계좌번호가 복사되었습니다.');
                                    }).catch((err)=>{comm.error('오류발생: ', err)})}}>
                                복사
                            </button>
                        </div>
                    ))}
                </Collapse>
            </div>
        </div>
    )
}