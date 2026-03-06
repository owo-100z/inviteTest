import React, { useEffect, useRef } from "react";

export default function IntroWithPetals({ imgUrl, isEffect = true, type = 'freesia', rounded = false, className = "" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null); // 1. 컨테이너 참조 추가

  useEffect(() => {
    if (!isEffect) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // 2. 캔버스 크기를 설정하는 함수 분리
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    setCanvasSize(); // 초기 설정

    const petals = [];
    const petalImages = Array.from({ length: 4 }, (_, i) => `/images/flower/${type}.${i + 1}.PNG`);
    const petalImgs = petalImages.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    class Petal {
      constructor() { this.reset(true); }
      reset(initial = false) {
        // 3. 캔버스 크기가 0일 경우를 대비한 안전 장치
        const w = canvas.width || window.innerWidth;
        const h = canvas.height || window.innerHeight;
        
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : -20 - Math.random() * 100;
        this.size = 8 + Math.random() * 5;
        this.speedY = 0.5 + Math.random() * 1;
        this.baseSpeedX = (Math.random() < 0.5 ? -1 : 1) * (0.3 + Math.random() * 0.7);
        this.swingAmplitude = 1 + Math.random() * 2;
        this.swingPhase = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1.5 - 0.75;
        this.rotationOffsetX = (Math.random() - 0.5) * this.size * 0.4;
        this.rotationOffsetY = (Math.random() - 0.5) * this.size * 0.4;
        this.img = petalImgs[Math.floor(Math.random() * petalImgs.length)];
      }
      update(frame) {
        this.y += this.speedY;
        this.x += this.baseSpeedX + Math.sin(frame / 30 + this.swingPhase) * this.swingAmplitude;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height + this.size) { this.reset(); this.y = -this.size; }
      }
      draw() {
        if (!this.img.complete || this.img.naturalWidth === 0) return;
        ctx.save();
        ctx.translate(this.x + this.rotationOffsetX, this.y + this.rotationOffsetY);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    let frame = 0;
    function animate() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => { p.update(frame); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    }

    // 4. 모든 이미지 로드 및 '이미지 태그'의 로드를 기다린 후 시작
    Promise.all(
      petalImgs.map(img => new Promise(res => { 
        if(img.complete) res(); else img.onload = res; 
      }))
    ).then(() => {
      setCanvasSize(); // 애니메이션 직전에 크기 재계산
      for (let i = 0; i < 15; i++) petals.push(new Petal());
      animate();
    });

    const handleResize = () => {
      setCanvasSize();
      petals.forEach(p => p.reset(true)); // 리사이즈 시 위치 재설정 (꼬임 방지)
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEffect, type, imgUrl]); // imgUrl 추가: 배경 이미지 변경 시 대응

  return (
    <div ref={containerRef} className="relative w-full h-full"> {/* 5. relative 컨테이너로 감쌈 */}
      <img
        src={imgUrl}
        alt="Background"
        className={`object-cover w-full h-full filter brightness-100 ${rounded ? 'rounded-xl' : ''} ${className}`}
      />
      {isEffect && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}
    </div>
  );
}