import React, { useState, useEffect } from 'react';
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import Gallery_P from './Gallery_P';

export default function Gallery({ wedding_data }) {
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const fetchedImages = wedding_data?.gallery || [];

        fetchedImages.sort(() => Math.random() - 0.5); // 랜덤 섞기

        setImages(fetchedImages);
    }, [wedding_data]);

    const gallery_popup = (index = 0) => {
        pop_open(<Gallery_P index={index} images={images} chgIndex={chgIndex} />);
    }

    const chgIndex = (index) => {
        if (imgIndex === Math.floor(index / 9)) return;

        const pageIndex = Math.floor(index / 9);
        paginate(pageIndex);
    }

    const handlePaginate = (direction) => {
        if (direction === 'next' && imgIndex < Math.ceil(images.length / 9) - 1) {
            paginate(imgIndex + 1);
        } else if (direction === 'prev' && imgIndex > 0) {
            paginate(imgIndex - 1);
        }
    }

    const paginate = (index) => {
        setFade(true);
        setTimeout(() => {
            setFade(false);
            setImgIndex(index);
        }, 200); // 페이드 아웃 시간
    }

    return (
        <div className="px-2 text-center text-gray-400 mb-14">
            {images.length > 0 && (
                <div className="text-3xl font-ongle justify-end flex mb-2 items-center gap-2">
                    <MdArrowLeft className='text-3xl cursor-pointer' onClick={() => {handlePaginate('prev');}} />
                    <span>( {imgIndex + 1} / {Math.ceil(images.length / 9)} )</span>
                    <MdArrowRight className='text-3xl cursor-pointer' onClick={() => {handlePaginate('next');}} />
                </div>
            )}
            <div className={`grid grid-cols-3 gap-1 duration-300 ease-initial ${fade ? 'opacity-0' : 'opacity-100'}`}>
                {images.length > 0 ? images.slice(0 + (9 * imgIndex), 9 + (9 * imgIndex)).map((src, i) => (
                    <img key={`img-${i}`}
                        src={src.replace(/(\.\w+)?$/, '_thumb$1')}
                        loading="lazy"
                        decoding="async"
                        alt={`Gallery ${i+1}`}
                        className="w-full h-32 object-cover rounded-sm transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={() => gallery_popup(i + (9 * imgIndex))}
                    />
                )) : (
                    <div className="col-span-3 flex justify-center items-center h-32">
                        <p>준비중입니다...</p>
                    </div>
                )}
                {images.length > 0 && images.slice(0 + (9 * imgIndex), 9 + (9 * imgIndex)).length < 9 && (
                    Array.from({ length: 9 - images.slice(0 + (9 * imgIndex), 9 + (9 * imgIndex)).length }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-full h-32 bg-gray-200 rounded-sm" />
                    ))
                )}
            </div>
            {images.length > 0 && <p className="tracking-wider px-4 text-xl font-ongle mb-6">사진을 클릭하시면 이미지가 확대됩니다</p>}
        </div>
    )
}