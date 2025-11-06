import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

export default function HeartNumber({ children }) {
  const [beat, setBeat] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setBeat(!beat);
    }, 1000);
  
    return () => clearInterval(timer);
  }, [beat])

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex justify-center items-center font-bold">
        {/* 하트 테두리 아이콘 */}
        <AiFillHeart className={`absolute text-red-500 w-12 h-12 duration-1500 ease-initial ${beat ? 'scale-110 opacity-50' : 'opacity-80'}`} />
        <span className="text-white z-50">{children}</span>
      </div>
    </div>
  );
}
