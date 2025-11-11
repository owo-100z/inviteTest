import React, { useState, useEffect } from 'react';
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import Gallery_P from './Gallery_P';

export default function Gallery() {
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [fade, setFade] = useState(false);

    const [pIdx, setPidx] = useState(0);

    useEffect(() => {
        // 실제 이미지 URL로 교체 필요
        const fetchedImages = [
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg',
            'https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg',
        ];

        fetchedImages.sort(() => Math.random() - 0.5); // 랜덤 섞기

        setImages(fetchedImages);
    }, []);

    useEffect(() => {
        const slides = document.querySelectorAll('.carousel-item');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id; // e.g. 'slide3'
                        const idx = parseInt(id.replace('slide', '')) - 1;
                        console.log('현재 인덱스:', idx);
                        // setCurrentIndex(idx);  // 필요하면 상태 업데이트
                    }
                });
            },
            {
                root: document.querySelector('.carousel'),
                threshold: 0.6, // 60% 이상 보이면 "현재 슬라이드"로 간주
            }
        );

        slides.forEach(slide => observer.observe(slide));

        return () => observer.disconnect();
    }, []);


    const gallery_popup = (index = 0) => {
        pop_open(<Gallery_P index={index} images={images} />);
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
            <div className="text-3xl font-ongle justify-end flex mb-2 items-center gap-2">
                <MdArrowLeft className='text-3xl cursor-pointer' onClick={() => {handlePaginate('prev');}} />
                <span>( {imgIndex + 1} / {Math.ceil(images.length / 9)} )</span>
                <MdArrowRight className='text-3xl cursor-pointer' onClick={() => {handlePaginate('next');}} />
            </div>
            <div className={`grid grid-cols-3 gap-1 duration-300 ease-initial ${fade ? 'opacity-0' : 'opacity-100'}`}>
                {images.length > 0 ? images.slice(0 + (9 * imgIndex), 9 + (9 * imgIndex)).map((src, i) => (
                    <img key={`img-${i}`} src={src} alt={`Gallery ${i+1}`} className="w-full h-32 object-cover rounded-sm transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={() => gallery_popup(i + (9 * imgIndex))}
                    />
                )) : (
                    <p>준비중입니다...</p>
                )}
                {images.slice(0 + (9 * imgIndex), 9 + (9 * imgIndex)).length < 9 && (
                    Array.from({ length: 9 - images.slice(0 + (9 * imgIndex), 9 + (9 * imgIndex)).length }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-full h-32 bg-gray-200 rounded-sm" />
                    ))
                )}
            </div>
            <p className="tracking-wider px-4 text-xl font-ongle mb-6">사진을 클릭하시면 이미지가 확대됩니다</p>
        </div>
    )
}