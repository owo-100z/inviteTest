import { useState, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import Menus from "./Menus"
import { AiFillHeart } from "react-icons/ai";

export default function Header() {
  const [showHeader, setShowHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return;
      if (window.scrollY > window.innerHeight) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-0 w-full h-[40px] top-0 z-50 transition-all duration-500 ease-initial
          ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full" }`
      }
      >
      <div className="bg-white/70 backdrop-blur-md shadow-md h-full flex items-center">
          <div className="container mx-auto flex justify-between px-4">
              <HiOutlineMenu className="cursor-pointer text-xl" onClick={() => {setMenuOpen(true)}} />
              <span className="font-bold flex justify-end flex-row">지원<strong className="text-red-500 text-xs p-1 content-center"><AiFillHeart /></strong>보람</span>
          </div>
      </div>

      {/* 풀스크린 오버레이 */}
      {menuOpen && (<Menus close={() => {setMenuOpen(false)}} />)}
    </header>
  );
}
