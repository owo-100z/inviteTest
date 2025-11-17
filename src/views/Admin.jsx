import Layout from "@/components/layouts/AdminLayout"
import Box from "@/components/Box"
import { useEffect, useState } from "react";
import DateTimePicker from "@/components/DateTimePicker";
import BankSelect from "@/components/BankSelect";
import ColorSelector from "@/components/ColorSelector";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { FaCar, FaBus, FaTrain } from "react-icons/fa";
import ImageUploaderM from "@/components/ImageUploaderM";
import ImageUploaderS from "@/components/ImageUploaderS";

const user_idx = 1;

const colorClasses = {
  gray: "text-gray-500",
  red: "text-red-500",
  orange: "text-orange-500",
  yellow: "text-yellow-400",
  green: "text-green-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
};

export default function Admin() {
    const [data, setData] = useState({});
    const [isNewData, setIsNewData] = useState(true);
    const [ntcIdx, setNtcIdx] = useState(0);
    const [directionIdx, setDirectionIdx] = useState(0);

    /* 사진 관련 여기에 몰아넣기
    {
        intro: [],
        outro: [],
        groom_img: [],
        bride_img: [],
        gallery: [],
        deleted: [],    // 삭제할 사진들
    }
    */
    const [photos, setPhotos] = useState({});

    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUploading, setImageUploading] = useState(false);

    useEffect(() => {
        document.title = "관리자 페이지";

        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await comm.getWeddingData(user_idx);

        // URL 세팅 (manual)
        const url = 'https://260613.vercel.app';

        if(!utils.isEmpty(res)) {
            setData({...res, url});
            setIsNewData(false);

            comm.log({...res, url});
        }
    }

    const saveWeddingData = async () => {
        if (!confirm('데이터를 저장하시겠습니까?')) {
            return;
        }

        const updateData = { ...data };

        // 사진 있을때 사진부터 저장
        if (!utils.isEmpty(photos)) {
            const imgRes = await saveImage(photos);

            if (imgRes.status !== 'success') {
                if (!confirm('이미지 업로드 중 오류가 발생하였습니다.\n이미지 저장 없이 데이터를 저장하시겠습니까?')) {
                    return;
                }
            } else {
                const galleryImgs = data.gallery ? [...data.gallery] : [];
                if (imgRes.data.gallery) {
                    imgRes.data.gallery.forEach((imgUrl) => {
                        if (!galleryImgs.includes(imgUrl)) {
                            galleryImgs.push(imgUrl);
                        }
                    });
                    imgRes.data.gallery = galleryImgs;
                }
                Object.assign(updateData, imgRes.data);
            }
        }

        const url = `/wedding${isNewData ? '' : `/${user_idx}`}`;
        const method = isNewData ? 'POST' : 'PUT';
        const body = {data: updateData};

        const res = await comm.api(url, {method, body});

        if (res.status === 'success') {
            alert('저장되었습니다.');
        } else {
            comm.error('* 에러발생 * ===> ', res);
            alert('오류가 발생하였습니다.');
        }
    }

    const saveImage = async (files) => {
        // 파일 삭제 먼저 처리
        if (files.deleted && files.deleted.length > 0) {
            const formData = new FormData();
            files.deleted.forEach((fileUrl) => formData.append('deleted', fileUrl));

            await comm.api('/upload', { method: 'POST', body: formData });
        }

        const cnt = Object.values(files).reduce((sum, arr) => {
            if (Array.isArray(arr) && arr !== files.deleted) {
                return sum + arr.length;
            }
            return sum;
        }, 0);

        if (cnt > 0) {
            setImageUploading(true);
            setUploadProgress(0);
        }

        const result = { status: 'success', data: {} };

        let uploadedCnt = 0;
        for (const type in files) {
            if (type === 'deleted') continue;

            for (const file of files[type]) {
                const formData = new FormData();
                formData.append(type, file);

                const res = await comm.api('/upload', {
                    method: 'POST',
                    body: formData,
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        comm.log(`이미지 업로드 진행률: ${percentCompleted}%`);
                        setUploadProgress(((uploadedCnt + (percentCompleted / 100)) / cnt) * 100);
                    }
                });

                // comm.log('개별 업로드 결과:', res);
                if (res.status === 'success') {
                    // comm.log(`업로드된 이미지들 [${type}]:`, res.data);
                    if (type === 'gallery') result.data[type] = result.data[type] ? [...result.data[type], ...res.data[type]] : res.data[type];
                    else if (res.data[type]) result.data[type] = res.data[type];

                    uploadedCnt++;
                } else {
                    comm.error(`* 이미지 업로드 에러 [${type}] * ===> `, res);
                    return res;
                }
            }
        }

        setImageUploading(false);

        return result;
    }

    const imageUpload = (files, type) => {
        if (!files) return;

        if (!Array.isArray(files)) {
            files = [files];
        }

        const newImages = { ...photos, [type]: files };

        setPhotos(newImages);

        const uploadedImages = data[type] ? [...data[type]] : [];

        if (type !== 'gallery' && uploadedImages.length > 0) {
            // 단일 이미지인 경우 기존 이미지를 대체
            const newPhotos = { ...newImages, deleted: [...newImages.deleted || [], uploadedImages[0]] };
            setPhotos(newPhotos);
        }
    }

    return (
        <Layout>
            {imageUploading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <p className="mb-4 font-semibold">이미지 업로드 중...</p>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                            <div className="bg-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <p>{Math.round(uploadProgress)}%</p>
                    </div>
                </div>
            )}
            <div className="px-2 text-center mb-6">
                <p className="tracking-wider px-4 mb-6 mt-6">관리페이지</p>
                <div className="grid gap-5 px-2">
                    <div className="join gap-2">
                        <label className="label w-[25%] font-semibold text-sm">만난 날짜</label>
                        <DateTimePicker initialValue={data?.start_date} onChange={(res) => {setData({...data, start_date: res?.format('YYYY-MM-DD')})}} showTime={false} />
                    </div>
                    <div className="flex gap-3">
                        <ImageUploaderS
                            label="인트로 이미지"
                            onChangeFile={(file) => { imageUpload(file, 'intro'); }}
                            initImage={data?.intro?.at(0) || null}
                        />
                        <ImageUploaderS
                            label="아웃트로 이미지"
                            onChangeFile={(file) => { imageUpload(file, 'outro'); }}
                            initImage={data?.outro?.at(0) || null}
                        />
                    </div>
                    <div className="flex gap-3">
                        <ImageUploaderS
                            label="신랑 프로필 이미지"
                            onChangeFile={(file) => { imageUpload(file, 'groom_img'); }}
                            initImage={data?.groom_img?.at(0) || null}
                        />
                        <ImageUploaderS
                            label="신부 프로필 이미지"
                            onChangeFile={(file) => { imageUpload(file, 'bride_img'); }}
                            initImage={data?.bride_img?.at(0) || null}
                        />
                    </div>
                    <div className="flex gap-3">
                        <label className="floating-label groom-color w-full">
                            <input type="text" placeholder="신랑이름" className="input w-full bg-white" value={data?.groom || ''} onChange={(e) => {setData({...data, groom: e.target.value})}} />
                            <span className="bg-white">신랑</span>
                        </label>
                        <label className="floating-label bride-color w-full">
                            <input type="text" placeholder="신부이름" className="input w-full bg-white" value={data?.bride || ''} onChange={(e) => {setData({...data, bride: e.target.value})}} />
                            <span className="bg-white">신부</span>
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <label className="floating-label groom-color w-full">
                            <input type="text" placeholder="신랑 영어이름" className="input w-full bg-white" value={data?.groom_en || ''} onChange={(e) => {setData({...data, groom_en: e.target.value})}} />
                            <span className="bg-white">groom</span>
                        </label>
                        <label className="floating-label bride-color w-full">
                            <input type="text" placeholder="신부 영어이름" className="input w-full bg-white" value={data?.bride_en || ''} onChange={(e) => {setData({...data, bride_en: e.target.value})}} />
                            <span className="bg-white">bride</span>
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <label className="floating-label groom-color w-full">
                            <input type="text" placeholder="신랑 전화번호" className="input w-full bg-white" value={data?.groom_tel || ''} onChange={(e) => {setData({...data, groom_tel: e.target.value})}} />
                            <span className="bg-white">전화번호</span>
                        </label>
                        <label className="floating-label bride-color w-full">
                            <input type="text" placeholder="신부 전화번호" className="input w-full bg-white" value={data?.bride_tel || ''} onChange={(e) => {setData({...data, bride_tel: e.target.value})}} />
                            <span className="bg-white">전화번호</span>
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
                        <span className="label w-[15%] font-semibold text-sm">예식일</span>
                        <DateTimePicker initialValue={data?.wedding_date} onChange={(res) => {setData({...data, wedding_date: res?.format('YYYY-MM-DD HH:mm')})}} />
                    </div>
                    <div className="join gap-2">
                        <span className="label w-[15%] font-semibold text-sm">예식장</span>
                        <input type="text" placeholder="예식장 이름" className="input w-full bg-white rounded-lg border-gray" value={data?.wedding_place || ''} onChange={(e) => {setData({...data, wedding_place: e.target.value})}} />
                    </div>
                    <div className="join gap-2">
                        <span className="label w-[15%] font-semibold text-sm">주소</span>
                        <input type="text" placeholder="예식장 주소" className="input w-full bg-white rounded-lg border-gray" value={data?.wedding_address || ''} onChange={(e) => {setData({...data, wedding_address: e.target.value})}} />
                    </div>
                    <div className="join gap-2">
                        <span className="label w-[15%] font-semibold text-sm">전화</span>
                        <input type="text" placeholder="예식장 전화번호" className="input w-full bg-white rounded-lg border-gray" value={data?.wedding_attract || ''} onChange={(e) => {setData({...data, wedding_attract: e.target.value})}} />
                    </div>
                    <fieldset className="fieldset text-start">
                        <legend className="fieldset-legend opacity-70 font-semibold text-sm">인사말</legend>
                        <textarea className="textarea h-30 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={data?.greetings || ''} onChange={(e) => {setData({...data, greetings: e.target.value})}}></textarea>
                    </fieldset>
                    <fieldset className="fieldset text-start">
                        <legend className="fieldset-legend opacity-70 font-semibold text-sm">신랑신부 소개글</legend>
                        <textarea className="textarea h-30 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={data?.introduction || ''} onChange={(e) => {setData({...data, introduction: e.target.value})}}></textarea>
                    </fieldset>
                    <div className="flex gap-3 groom-color">
                        <label className="floating-label w-full">
                            <input type="text" placeholder="신랑측 아버지 성함" className="input w-full bg-white" value={data?.groom_f || ''} onChange={(e) => {setData({...data, groom_f: e.target.value})}} />
                            <span className="bg-white">신랑 아버지</span>
                        </label>
                        <label className="floating-label w-full">
                            <input type="text" placeholder="신랑측 어머니 성함" className="input w-full bg-white" value={data?.groom_m || ''} onChange={(e) => {setData({...data, groom_m: e.target.value})}} />
                            <span className="bg-white">신랑 어머니</span>
                        </label>
                    </div>
                    <div className="flex gap-3 groom-color">
                        <label className="floating-label w-full">
                            <input type="text" placeholder="신랑측 아버지 전화번호" className="input w-full bg-white" value={data?.groom_f_tel || ''} onChange={(e) => {setData({...data, groom_f_tel: e.target.value})}} />
                            <span className="bg-white">전화번호</span>
                        </label>
                        <label className="floating-label w-full">
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
                        <label className="floating-label w-full">
                            <input type="text" placeholder="신부측 아버지 성함" className="input w-full bg-white" value={data?.bride_f || ''} onChange={(e) => {setData({...data, bride_f: e.target.value})}} />
                            <span className="bg-white">신부 아버지</span>
                        </label>
                        <label className="floating-label w-full">
                            <input type="text" placeholder="신부측 어머니 성함" className="input w-full bg-white" value={data?.bride_m || ''} onChange={(e) => {setData({...data, bride_m: e.target.value})}} />
                            <span className="bg-white">신부 어머니</span>
                        </label>
                    </div>
                    <div className="flex gap-3 bride-color">
                        <label className="floating-label w-full">
                            <input type="text" placeholder="신부측 아버지 전화번호" className="input w-full bg-white" value={data?.bride_f_tel || ''} onChange={(e) => {setData({...data, bride_f_tel: e.target.value})}} />
                            <span className="bg-white">전화번호</span>
                        </label>
                        <label className="floating-label w-full">
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
                                <span className="font-semibold text-sm opacity-70">안내사항</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <MdArrowLeft className="cursor-pointer" onClick={() => {if(ntcIdx > 0) setNtcIdx(ntcIdx-1)}} />
                                <span>{ntcIdx+1} / {data.notice?.length || 1}</span>
                                <MdArrowRight className="cursor-pointer" onClick={() => {if(ntcIdx < data.notice?.length-1) setNtcIdx(ntcIdx+1)}} />
                                <button className="btn btn-xs" onClick={() => {
                                    setNtcIdx(data.notice?.length || 1);
                                    if (!data.notice) data.notice = [""];
                                    if (!data.ntcTitle) data.ntcTitle = ["안내사항"];
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
                        <legend className="fieldset-legend opacity-70 font-semibold text-sm">축의금 계좌 안내문</legend>
                        <textarea className="textarea h-30 bg-white w-full" autoComplete="off" placeholder="메시지를 작성해 주세요" value={data?.account_anounce || ''} onChange={(e) => {setData({...data, account_anounce: e.target.value})}}></textarea>
                    </fieldset>
                    <div className="join gap-2">
                        <span className="label w-[15%] font-semibold text-sm">안내글</span>
                        <input type="text" placeholder="청첩장 안내글 (ex. 우리 결혼해요 💍)" className="input w-full bg-white rounded-lg border-gray" value={data?.title || ''} onChange={(e) => {setData({...data, title: e.target.value})}} />
                    </div>
                    <fieldset className="fieldset text-start">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold text-sm opacity-70">오시는길</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <MdArrowLeft className="cursor-pointer" onClick={() => {if(directionIdx > 0) setDirectionIdx(directionIdx-1)}} />
                                <span>{directionIdx+1} / {data.directions?.length || 1}</span>
                                <MdArrowRight className="cursor-pointer" onClick={() => {if(directionIdx < data.directions?.length-1) setDirectionIdx(directionIdx+1)}} />
                                <button className="btn btn-xs" onClick={() => {
                                    setDirectionIdx(data.directions?.length || 1);
                                    if (!data.directions) data.directions = [{}];
                                    data.directions?.push({});
                                }}>+ 추가</button>
                                <button className="btn btn-xs" onClick={() => {
                                    setDirectionIdx(directionIdx > 0 ? directionIdx-1 : 0);
                                    const newDirection = directionIdx > 0 ? data.directions?.filter((_, i) => i !== directionIdx) : [{}];
                                    setData({ ...data, directions: newDirection });
                                }}>- 삭제</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <input type="text" placeholder="교통수단 종류 (ex. 자차, 버스)" className="input w-full bg-white rounded-lg border-gray" value={data?.directions?.at(directionIdx)?.title || ''} onChange={(e) => {
                                const newDirection = data.directions?.length > 0 ? [...data.directions] : [];
                                const tmp = data?.directions?.at(directionIdx) ? {...data?.directions?.at(directionIdx)} : {}
                                tmp.title = e.target.value;
                                newDirection[directionIdx] = tmp;
                                setData({...data, directions: newDirection});
                            }} />
                            <div className="flex gap-1 items-center">
                                {/* 자동차 */}
                                <input
                                    type="radio"
                                    id={`radio-car-${directionIdx}`}
                                    name={`radio-${directionIdx}`} // 중요: index별로 name 분리
                                    className="radio radio-xs"
                                    checked={data?.directions?.[directionIdx]?.type === 'car'}
                                    onChange={() => {
                                        const newDirection = [...(data.directions || [])];
                                        const tmp = { ...(newDirection[directionIdx] || {}) };
                                        tmp.type = 'car';
                                        newDirection[directionIdx] = tmp;
                                        setData({ ...data, directions: newDirection });
                                    }}
                                />
                                <label htmlFor={`radio-car-${directionIdx}`}>
                                    <FaCar className="text-lg cursor-pointer" />
                                </label>

                                {/* 버스 */}
                                <input
                                    type="radio"
                                    id={`radio-bus-${directionIdx}`}
                                    name={`radio-${directionIdx}`}
                                    className="radio radio-xs"
                                    checked={data?.directions?.[directionIdx]?.type === 'bus'}
                                    onChange={() => {
                                        const newDirection = [...(data.directions || [])];
                                        const tmp = { ...(newDirection[directionIdx] || {}) };
                                        tmp.type = 'bus';
                                        newDirection[directionIdx] = tmp;
                                        setData({ ...data, directions: newDirection });
                                    }}
                                />
                                <label htmlFor={`radio-bus-${directionIdx}`}>
                                    <FaBus className="text-lg cursor-pointer" />
                                </label>

                                {/* 기차 */}
                                <input
                                    type="radio"
                                    id={`radio-train-${directionIdx}`}
                                    name={`radio-${directionIdx}`}
                                    className="radio radio-xs"
                                    checked={data?.directions?.[directionIdx]?.type === 'train'}
                                    onChange={() => {
                                        const newDirection = [...(data.directions || [])];
                                        const tmp = { ...(newDirection[directionIdx] || {}) };
                                        tmp.type = 'train';
                                        newDirection[directionIdx] = tmp;
                                        setData({ ...data, directions: newDirection });
                                    }}
                                />
                                <label htmlFor={`radio-train-${directionIdx}`}>
                                    <FaTrain className="text-lg cursor-pointer" />
                                </label>
                                &nbsp;
                                <ColorSelector
                                    value={data?.directions?.[directionIdx]?.color || "gray"}
                                    onChange={(color) => {
                                        const newDirections = [...(data.directions || [])];
                                        const tmp = { ...(newDirections[directionIdx] || {}) };
                                        tmp.color = color;
                                        newDirections[directionIdx] = tmp;
                                        setData({ ...data, directions: newDirections });
                                    }}
                                />
                            </div>
                        </div>
                        <input type="text" placeholder="교통수단 명 (ex. 1호선, 2호선 등 생략가능)" className={`input w-full bg-white rounded-lg border-gray ${colorClasses[data?.directions?.[directionIdx]?.color || "gray"]}`} value={data?.directions?.at(directionIdx)?.subTitle || ''} onChange={(e) => {
                            const newDirection = data.directions?.length > 0 ? [...data.directions] : [];
                            const tmp = data?.directions?.at(directionIdx) ? {...data?.directions?.at(directionIdx)} : {}
                            tmp.subTitle = e.target.value;
                            newDirection[directionIdx] = tmp;
                            setData({...data, directions: newDirection});
                        }} />
                        <textarea className="textarea h-30 bg-white w-full" autoComplete="off" placeholder="이용 방법을 작성해 주세요" value={data?.directions?.at(directionIdx)?.desc || ''} onChange={(e) => {
                            const newDirection = data.directions?.length > 0 ? [...data.directions] : [];
                            const tmp = data?.directions?.at(directionIdx) ? {...data?.directions?.at(directionIdx)} : {}
                            tmp.desc = e.target.value;
                            newDirection[directionIdx] = tmp;
                            setData({...data, directions: newDirection});
                        }}></textarea>
                        <div className="flex justify-between items-center gap-2">
                            <input type="text" placeholder="교통수단 안내 링크 추가" className="input w-full bg-white rounded-lg border-gray" value={data?.directionsLink || ''} onChange={(e) => {setData({...data, directionsLink: e.target.value})}} />
                            <label className="label">
                                <input type="checkbox" className="toggle" checked={data?.useDirectionsLink || false} onChange={(e) => {setData({...data, useDirectionsLink: !data?.useDirectionsLink})}} />
                                링크 사용
                            </label>
                        </div>
                    </fieldset>
                    <ImageUploaderM
                        label="갤러리 이미지 업로드"
                        onChangeFiles={(files) => {
                            imageUpload(files, 'gallery');
                        }}
                        initImages={data?.gallery || []}
                    />
                    <button className="btn btn-outline w-full" onClick={saveWeddingData}>저장하기</button>
                </div>
            </div>
        </Layout>
    )
}