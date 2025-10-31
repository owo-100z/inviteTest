import Layout from "@/components/layouts/Layout"
import Box from "@/components/Box"
import { useEffect, useState } from "react";
import DateTimePicker from "@/components/DateTimePicker";
import BankSelect from "@/components/BankSelect";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

const user_idx = 1;

export default function Admin() {
    const [data, setData] = useState({});
    const [isNewData, setIsNewData] = useState(true);
    const [ntcIdx, setNtcIdx] = useState(0);

    useEffect(() => {
        document.title = "관리자 페이지";

        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await comm.getWeddingData(user_idx);

        // URL 세팅
        const url = 'https://owo-100z.github.io/inviteTest/';

        if(!utils.isEmpty(res)) {
            setData({...res, url});
            setIsNewData(false);

            comm.log({...res, url});
        }
    }

    const saveWeddingData = async () => {
        const url = `/wedding${isNewData ? '' : `/${user_idx}`}`;
        const method = isNewData ? 'POST' : 'PUT';
        const body = {data};

        const res = await comm.api(url, {method, body});

        if (res.status === 'success') {
            alert('저장되었습니다.');
        } else {
            comm.error('* 에러발생 * ===> ', res);
            alert('오류가 발생하였습니다.');
        }
    }

    return (
        <Layout>
            <Box>
                <div className="px-2 text-center mb-6">
                    <p className="tracking-wider px-4 mb-6 mt-6">관리페이지</p>
                    <div className="grid gap-5 px-2">
                        <div className="join gap-2">
                            <label className="label w-[25%]">만난 날짜</label>
                            <DateTimePicker initialValue={data?.start_date} onChange={(res) => {setData({...data, start_date: res?.format('YYYY-MM-DD')})}} showTime={false} />
                        </div>
                        <div className="flex gap-3">
                            <label className="floating-label groom-color">
                                <input type="text" placeholder="신랑이름" className="input w-full bg-white" value={data?.groom || ''} onChange={(e) => {setData({...data, groom: e.target.value})}} />
                                <span className="bg-white">신랑</span>
                            </label>
                            <label className="floating-label bride-color">
                                <input type="text" placeholder="신부이름" className="input w-full bg-white" value={data?.bride || ''} onChange={(e) => {setData({...data, bride: e.target.value})}} />
                                <span className="bg-white">신부</span>
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <label className="floating-label groom-color">
                                <input type="text" placeholder="신랑 영어이름" className="input w-full bg-white" value={data?.groom_en || ''} onChange={(e) => {setData({...data, groom_en: e.target.value})}} />
                                <span className="bg-white">groom</span>
                            </label>
                            <label className="floating-label bride-color">
                                <input type="text" placeholder="신부 영어이름" className="input w-full bg-white" value={data?.bride_en || ''} onChange={(e) => {setData({...data, bride_en: e.target.value})}} />
                                <span className="bg-white">bride</span>
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <label className="floating-label groom-color">
                                <input type="text" placeholder="신랑 전화번호" className="input w-full bg-white" value={data?.groom_tel || ''} onChange={(e) => {setData({...data, groom_tel: e.target.value})}} />
                                <span className="bg-white">전화번호</span>
                            </label>
                            <label className="floating-label bride-color">
                                <input type="text" placeholder="신부 전화번호" className="input w-full bg-white" value={data?.bride_tel || ''} onChange={(e) => {setData({...data, bride_tel: e.target.value})}} />
                                <span className="bg-white">전화번호</span>
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <label className="floating-label groom-color">
                                <input type="text" placeholder="신랑 계좌번호" className="input w-full bg-white" value={data?.groom_account || ''} onChange={(e) => {setData({...data, groom_account: e.target.value})}} />
                                <span className="bg-white">계좌번호</span>
                            </label>
                            <label className="floating-label bride-color">
                                <input type="text" placeholder="신부 계좌번호" className="input w-full bg-white" value={data?.bride_account || ''} onChange={(e) => {setData({...data, bride_account: e.target.value})}} />
                                <span className="bg-white">계좌번호</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <BankSelect value={data?.groom_bank?.code || ""} onChange={(b) => setData({...data, groom_bank: b})}/>
                            <label className="floating-label groom-color w-[70%]">
                                <input type="text" placeholder="신랑 계좌번호" className="input w-full bg-white" value={data?.groom_account || ''} onChange={(e) => {setData({...data, groom_account: e.target.value})}} />
                                <span className="bg-white">신랑계좌</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <BankSelect value={data?.bride_bank?.code || ""} onChange={(b) => setData({...data, bride_bank: b})}/>
                            <label className="floating-label bride-color w-[70%]">
                                <input type="text" placeholder="신부 계좌번호" className="input w-full bg-white" value={data?.bride_account || ''} onChange={(e) => {setData({...data, bride_account: e.target.value})}} />
                                <span className="bg-white">신부계좌</span>
                            </label>
                        </div>
                        <div className="join gap-2">
                            <span className="label w-[15%]">예식일</span>
                            <DateTimePicker initialValue={data?.wedding_date} onChange={(res) => {setData({...data, wedding_date: res?.format('YYYY-MM-DD HH:mm')})}} />
                        </div>
                        <div className="join gap-2">
                            <span className="label w-[15%]">예식장</span>
                            <input type="text" placeholder="예식장 이름" className="input w-full bg-white rounded-lg border-gray" value={data?.wedding_place || ''} onChange={(e) => {setData({...data, wedding_place: e.target.value})}} />
                        </div>
                        <div className="join gap-2">
                            <span className="label w-[15%]">주소</span>
                            <input type="text" placeholder="예식장 주소" className="input w-full bg-white rounded-lg border-gray" value={data?.wedding_address || ''} onChange={(e) => {setData({...data, wedding_address: e.target.value})}} />
                        </div>
                        <div className="join gap-2">
                            <span className="label w-[15%]">전화</span>
                            <input type="text" placeholder="예식장 전화번호" className="input w-full bg-white rounded-lg border-gray" value={data?.wedding_attract || ''} onChange={(e) => {setData({...data, wedding_attract: e.target.value})}} />
                        </div>
                        <fieldset className="fieldset text-start">
                            <legend className="fieldset-legend opacity-70">인사말</legend>
                            <textarea className="textarea h-30 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={data?.greetings || ''} onChange={(e) => {setData({...data, greetings: e.target.value})}}></textarea>
                        </fieldset>
                        <fieldset className="fieldset text-start">
                            <legend className="fieldset-legend opacity-70">신랑신부 소개글</legend>
                            <textarea className="textarea h-30 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={data?.introduction || ''} onChange={(e) => {setData({...data, introduction: e.target.value})}}></textarea>
                        </fieldset>
                        <div className="flex gap-3 groom-color">
                            <label className="floating-label">
                                <input type="text" placeholder="신랑측 아버지 성함" className="input w-full bg-white" value={data?.groom_f || ''} onChange={(e) => {setData({...data, groom_f: e.target.value})}} />
                                <span className="bg-white">신랑 아버지</span>
                            </label>
                            <label className="floating-label">
                                <input type="text" placeholder="신랑측 어머니 성함" className="input w-full bg-white" value={data?.groom_m || ''} onChange={(e) => {setData({...data, groom_m: e.target.value})}} />
                                <span className="bg-white">신랑 어머니</span>
                            </label>
                        </div>
                        <div className="flex gap-3 groom-color">
                            <label className="floating-label">
                                <input type="text" placeholder="신랑측 아버지 전화번호" className="input w-full bg-white" value={data?.groom_f_tel || ''} onChange={(e) => {setData({...data, groom_f_tel: e.target.value})}} />
                                <span className="bg-white">전화번호</span>
                            </label>
                            <label className="floating-label">
                                <input type="text" placeholder="신랑측 어머니 전화번호" className="input w-full bg-white" value={data?.groom_m_tel || ''} onChange={(e) => {setData({...data, groom_m_tel: e.target.value})}} />
                                <span className="bg-white">전화번호</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <BankSelect value={data?.groom_f_bank?.code || ""} onChange={(b) => setData({...data, groom_f_bank: b})}/>
                            <label className="floating-label groom-color w-[70%]">
                                <input type="text" placeholder="신랑측 아버지 계좌번호" className="input w-full bg-white" value={data?.groom_f_account || ''} onChange={(e) => {setData({...data, groom_f_account: e.target.value})}} />
                                <span className="bg-white">신랑 부 계좌</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <BankSelect value={data?.groom_m_bank?.code || ""} onChange={(b) => setData({...data, groom_m_bank: b})}/>
                            <label className="floating-label groom-color w-[70%]">
                                <input type="text" placeholder="신랑측 어머니 계좌번호" className="input w-full bg-white" value={data?.groom_m_account || ''} onChange={(e) => {setData({...data, groom_m_account: e.target.value})}} />
                                <span className="bg-white">신랑 모 계좌</span>
                            </label>
                        </div>
                        <div className="flex gap-3 bride-color">
                            <label className="floating-label">
                                <input type="text" placeholder="신부측 아버지 성함" className="input w-full bg-white" value={data?.bride_f || ''} onChange={(e) => {setData({...data, bride_f: e.target.value})}} />
                                <span className="bg-white">신부 아버지</span>
                            </label>
                            <label className="floating-label">
                                <input type="text" placeholder="신부측 어머니 성함" className="input w-full bg-white" value={data?.bride_m || ''} onChange={(e) => {setData({...data, bride_m: e.target.value})}} />
                                <span className="bg-white">신부 어머니</span>
                            </label>
                        </div>
                        <div className="flex gap-3 bride-color">
                            <label className="floating-label">
                                <input type="text" placeholder="신부측 아버지 전화번호" className="input w-full bg-white" value={data?.bride_f_tel || ''} onChange={(e) => {setData({...data, bride_f_tel: e.target.value})}} />
                                <span className="bg-white">전화번호</span>
                            </label>
                            <label className="floating-label">
                                <input type="text" placeholder="신부측 어머니 전화번호" className="input w-full bg-white" value={data?.bride_m_tel || ''} onChange={(e) => {setData({...data, bride_m_tel: e.target.value})}} />
                                <span className="bg-white">전화번호</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <BankSelect value={data?.bride_f_bank?.code || ""} onChange={(b) => setData({...data, bride_f_bank: b})}/>
                            <label className="floating-label bride-color w-[70%]">
                                <input type="text" placeholder="신부측 아버지 계좌번호" className="input w-full bg-white" value={data?.bride_f_account || ''} onChange={(e) => {setData({...data, bride_f_account: e.target.value})}} />
                                <span className="bg-white">신부 부 계좌</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <BankSelect value={data?.bride_m_bank?.code || ""} onChange={(b) => setData({...data, bride_m_bank: b})}/>
                            <label className="floating-label bride-color w-[70%]">
                                <input type="text" placeholder="신부측 어머니 계좌번호" className="input w-full bg-white" value={data?.bride_m_account || ''} onChange={(e) => {setData({...data, bride_m_account: e.target.value})}} />
                                <span className="bg-white">신부 모 계좌</span>
                            </label>
                        </div>
                        <fieldset className="fieldset text-start">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <span className="font-semibold opacity-70">안내사항</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <MdArrowLeft className="cursor-pointer" onClick={() => {if(ntcIdx > 0) setNtcIdx(ntcIdx-1)}} />
                                    <span>{ntcIdx+1} / {data.notice?.length}</span>
                                    <MdArrowRight className="cursor-pointer" onClick={() => {if(ntcIdx < data.notice?.length-1) setNtcIdx(ntcIdx+1)}} />
                                    <button className="btn btn-xs" onClick={() => {
                                        setNtcIdx(data.notice?.length);
                                        data.notice?.push("");
                                        data.ntcTitle?.push("안내사항");
                                    }}>+ 추가</button>
                                    <button className="btn btn-xs" onClick={() => {
                                        setNtcIdx(ntcIdx > 0 ? ntcIdx-1 : 0);
                                        const newNotice = ntcIdx > 0 ? data.notice?.filter((_, i) => i !== ntcIdx) : [""];
                                        const newNtcTitle = ntcIdx > 0 ? data.ntcTitle?.filter((_, i) => i !== ntcIdx) : ["안내사항"];
                                        setData({ ...data, notice: newNotice, ntcTitle: newNtcTitle });
                                    }}>- 삭제</button>
                                </div>
                            </div>
                            <input type="text" placeholder="안내사항 명" maxLength={8} className="input w-full bg-white rounded-lg border-gray" value={data?.ntcTitle?.at(ntcIdx) || ''} onChange={(e) => {
                                const newTitleList = data.ntcTitle?.length > 0 ? [...data.ntcTitle] : [];
                                newTitleList[ntcIdx] = e.target.value;
                                setData({...data, ntcTitle: newTitleList});
                            }} />
                            <textarea className="textarea h-30 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={data?.notice?.at(ntcIdx) || ''} onChange={(e) => {
                                const newNotice = data.notice?.length > 0 ? [...data.notice] : [];
                                newNotice[ntcIdx] = e.target.value;
                                setData({...data, notice: newNotice});
                            }}></textarea>
                        </fieldset>
                        <fieldset className="fieldset text-start">
                            <legend className="fieldset-legend opacity-70">축의금 계좌 안내문</legend>
                            <textarea className="textarea h-30 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={data?.account_anounce || ''} onChange={(e) => {setData({...data, account_anounce: e.target.value})}}></textarea>
                        </fieldset>
                        <div className="join gap-2">
                            <span className="label w-[15%]">안내글</span>
                            <input type="text" placeholder="청첩장 안내글 (ex. 우리 결혼해요 💍)" className="input w-full bg-white rounded-lg border-gray" value={data?.title || ''} onChange={(e) => {setData({...data, title: e.target.value})}} />
                        </div>
                        <button className="btn btn-outline w-full" onClick={saveWeddingData}>저장하기</button>
                    </div>
                </div>
            </Box>
        </Layout>
    )
}