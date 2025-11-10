import React, { useEffect, useRef } from "react";

export default function IntroWithPetals({ imgUrl, isEffect = true, type = 'sakura', rounded = false, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isEffect) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const petals = [];
    
    const petalImages = Array.from({ length: 4 }, (_, i) => `/images/flower/${type}.${i + 1}.PNG`);

    const petalImgs = petalImages.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -20 - Math.random() * 100;
        this.size = 5 + Math.random() * 5;
        this.speedY = 0.5 + Math.random() * 1;
        this.baseSpeedX = (Math.random() < 0.5 ? -1 : 1) * (0.3 + Math.random() * 0.7);
        this.swingAmplitude = 1 + Math.random() * 2;
        this.swingPhase = Math.random() * Math.PI * 2;

        // 🔹 랜덤 시작 회전 (0~360도)
        this.rotation = Math.random() * 360;

        // 🔹 회전 속도 (±)
        this.rotationSpeed = Math.random() * 1.5 - 0.75;

        // 🔹 회전 중심 위치 약간 랜덤하게 (자연스러운 비틀림 효과)
        this.rotationOffsetX = (Math.random() - 0.5) * this.size * 0.4;
        this.rotationOffsetY = (Math.random() - 0.5) * this.size * 0.4;

        this.img = petalImgs[Math.floor(Math.random() * petalImgs.length)];
      }

      update(frame) {
        this.y += this.speedY;
        this.x += this.baseSpeedX + Math.sin(frame / 30 + this.swingPhase) * this.swingAmplitude;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + this.size) {
          this.reset();
          this.y = -this.size;
        }
      }

      draw() {
        if (!this.img.complete) return;
        ctx.save();
        // 🔹 회전 기준 위치 랜덤 오프셋 적용
        ctx.translate(this.x + this.rotationOffsetX, this.y + this.rotationOffsetY);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }

      // reset(initial = false) {
      //   // 시작 위치를 화면 전체 상단에 랜덤 배치
      //   this.x = Math.random() * canvas.width;

      //   if (initial) {
      //       // 처음 생성될 때는 화면 안 아무 위치
      //       this.y = Math.random() * canvas.height;
      //   } else {
      //       // 리셋될 때는 화면 위에서 새로 떨어지게
      //       this.y = -20 - Math.random() * 100;
      //   }

      //   // 꽃잎 크기
      //   this.size = 5 + Math.random() * 5;

      //   // 낙하 속도
      //   this.speedY = 0.5 + Math.random() * 1;

      //   // 기본 좌우 이동 방향 (왼쪽 또는 오른쪽)
      //   this.baseSpeedX = (Math.random() < 0.5 ? -1 : 1) * (0.3 + Math.random() * 0.7);

      //   // 흔들림 세기 & 위상 (sin 파형)
      //   this.swingAmplitude = 1 + Math.random() * 2; // 흔들림 폭
      //   this.swingPhase = Math.random() * Math.PI * 2; // 시작 위치

      //   // 회전
      //   this.rotation = Math.random() * 360;
      //   this.rotationSpeed = Math.random() * 1.5 - 0.75;

      //   // 랜덤 꽃잎 이미지
      //   this.img = petalImgs[Math.floor(Math.random() * petalImgs.length)];
      // }

      // update(frame) {
      //   this.y += this.speedY;
      //   this.x +=
      //     this.baseSpeedX +
      //     Math.sin(frame / 30 + this.swingPhase) * this.swingAmplitude;

      //   this.rotation += this.rotationSpeed;

      //   // 화면 밖으로 나가면 리셋
      //   if (this.y > canvas.height + this.size) {
      //     this.reset();
      //     this.y = -this.size;
      //   }
      // }

      // draw() {
      //   if (!this.img.complete) return;
      //   ctx.save();
      //   ctx.translate(this.x, this.y);
      //   ctx.rotate((this.rotation * Math.PI) / 180);
      //   ctx.drawImage(
      //     this.img,
      //     -this.size / 2,
      //     -this.size / 2,
      //     this.size,
      //     this.size
      //   );
      //   ctx.restore();
      // }
    }

    for (let i = 0; i < 15; i++) {
      petals.push(new Petal());
    }

    let frame = 0;
    function animate() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.update(frame);
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    // 이미지가 모두 로드되면 시작
    Promise.all(
      petalImgs.map(
        (img) =>
          new Promise((resolve) => {
            img.onload = resolve;
          })
      )
    ).then(() => animate());

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isEffect, type]);

  return (
    <>
      {/* 배경 사진 */}
      <img
        src={imgUrl}
        alt="Background"
        className={`object-cover w-full h-full filter brightness-100 ${rounded ? 'rounded-xl' : ''} ${className}`}
      />

      {/* 캔버스 (꽃잎 효과) */}
      {isEffect && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />)}
    </>
  );
}