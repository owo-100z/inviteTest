import React, { useState, useEffect } from 'react';
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export default function Gallery() {
    const [imgIndex, setImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [fade, setFade] = useState(false);

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
        pop_open(
            <>
                <div className="absolute w-full flex justify-start items-center -my-6 z-10">
                    <span>{index+1} / {images.length}</span>
                </div>
                <div className="carousel h-[80svh] w-full bg-white">
                    {images.length > 0 ? images.map((src, i) => (
                        <div key={`slide-${i}`} id={`slide${i+1}`} className="carousel-item relative w-full">
                            <img src={src} className="w-full object-cover" />
                            <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between h-full">
                                <a href={`#slide${i === 0 ? 0 : i}`} className="w-15 h-full content-center text-start">❮</a>
                                <div className='w-full' onClick={() => {pop_close();}}></div>
                                <a href={`#slide${i === images.length - 1 ? images.length : i + 2}`} className="w-15 h-full content-center text-end">❯</a>
                            </div>
                        </div>
                    )) : (
                        <p>준비중입니다...</p>
                    )}
                </div>
            </>
        );
        setTimeout(() => {
            document.getElementById(`slide${index+1}`)?.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
        }, 10);
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