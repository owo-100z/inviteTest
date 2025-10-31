import { useRef, useState, useEffect } from "react";
import { HiOutlineMenu, HiMusicNote } from "react-icons/hi";
import Menus from "./Menus"
import { AiFillHeart } from "react-icons/ai";
import { IoVolumeMuteSharp } from "react-icons/io5";

export default function Header({ wedding_data }) {
  const [showHeader, setShowHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const musicToggle = useRef(null);

  useEffect(() => {
    checkMusic();

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

  const checkMusic = () => {
    const audio = audioRef.current;
    const music = musicToggle.current;

    const updateCheck = () => {
      if (!audio.paused || audio.currentTime > 0) {
        music.checked = true;
      } else {
        music.checked = false;
      }
    };

    audio.addEventListener("play", updateCheck);
  }

  const togglePlay = (play) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (play) {
      audio.play().catch(err => console.log("Autoplay blocked:", err));
    } else {
      audio.pause();
    }
  }

  return (
    <header className='fixed inset-0 w-full h-[40px] max-w-md mx-auto lg:w-[400px] top-0 z-50'>
      <audio ref={audioRef} autoPlay loop src="/inviteTest/music/Ending.mp3" />
      <button className='absolute top-1/2 right-5 -translate-y-1/2 pb-1 cursor-pointer z-[100] opacity-50'>
        <label className="swap">
          <input ref={musicToggle} type="checkbox" />

          <HiMusicNote className="swap-on" onClick={() => {togglePlay(true);}} />
          <IoVolumeMuteSharp className="swap-off" onClick={() => {togglePlay(false);}} />
        </label>
      </button>
      <div className={`h-full w-full transition-all duration-500 ease-initial ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full" }`}>
        <div className="bg-white/70 backdrop-blur-md shadow-md h-full flex items-center">
            <div className="container mx-auto flex justify-between px-4">
                <HiOutlineMenu className="cursor-pointer text-xl" onClick={() => {setMenuOpen(true)}} />
                <span className="font-bold flex justify-end flex-row">{wedding_data?.groom?.substr(1)}<strong className="text-red-500/80 text-xs p-1 content-center"><AiFillHeart /></strong>{wedding_data?.bride?.substr(1)}</span>
                <div></div>
            </div>
        </div>

        {/* 풀스크린 오버레이 */}
        {menuOpen && (<Menus close={() => {setMenuOpen(false)}} wedding_date={wedding_data?.wedding_date} />)}
      </div>
    </header>
  );
}
