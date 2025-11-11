import { useState, useEffect } from "react";

export default function Gallery_P({ index = 0, images = [] }) {
    const [pIdx, setPidx] = useState(index);

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const slides = container.querySelectorAll('.carousel-item');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.id.replace('slide',''), 10) - 1;
                    setPidx(idx);
                }
            });
        }, {
            root: container,
            threshold: 0.6,
        });

        slides.forEach(s => observer.observe(s));

        // initial scroll to index
        requestAnimationFrame(() => {
            container.querySelector(`#slide${index+1}`)?.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
        });

        return () => observer.disconnect();
    }, [images, index]);

    return (
        <>
            <div className="absolute w-full flex justify-start items-center -my-6 z-10">
                <span>{pIdx+1} / {images.length}</span>
            </div>
            <div className="carousel h-[80svh] w-full bg-white" ref={containerRef}>
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
    )
}