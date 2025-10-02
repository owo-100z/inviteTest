import { AiOutlineHeart } from "react-icons/ai";

export default function HeartNumber({ children }) {
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex justify-center items-center font-bold">
        {/* 하트 테두리 아이콘 */}
        <AiOutlineHeart className="absolute text-red-500 w-12 h-12" />
        {children}
      </div>
    </div>
  );
}
