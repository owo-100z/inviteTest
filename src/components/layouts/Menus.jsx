import { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";

const menuItems = [
  { name: "메인", link: "#cover", show: false },
  { name: "인사말", link: "#greetings", show: false },
  { name: "소개", link: "#introduction", show: false },
  { name: "달력", link: "#calendar", show: false },
  { name: "오시는곳", link: "#location", show: false },
  { name: "안내사항", link: "#notice", show: false },
  { name: "사진첩", link: "#gallery", show: false },
  { name: "방명록", link: "#message", show: false },
  { name: "마음전하실 곳", link: "#account", show: false },
];

let scrollY = 0;

export default function MenuOverlay({ close = () => {}, wedding_date }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [menus, setMenus] = useState(menuItems);

  const limit = utils.getDayDiff(utils.getToday(), wedding_date);

  // 스크롤 차단
  useEffect(() => {
    const y = window.scrollY;
    if (y === 0) return;

    scrollY = y;

    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;

    const newMenus = menuItems.map(item => ({ ...item, show: false }));

    setMenus(newMenus);
    newMenus.forEach((item, index) => {
      setTimeout(() => {
        setMenus(prevMenus => {
          const newMenus = [...prevMenus];
          newMenus[index].show = true;
          return newMenus;
        });
      }, index * 50);
    });
  }, []);

  const menuClose = () => {
    setFadeOut(true);
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollY);

    setTimeout(() => {
      close();
    }, 250);
  }

  const onMenuClick = (link) => {
    menuClose();
    setTimeout(() => {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  }

  return (
    <div className={`fixed inset-0 z-50 w-full h-dvh flex flex-col bg-white/50 transition-behavior duration-500 ease-in-out backdrop-blur-sm ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* 닫기 버튼 */}
        <div className="flex justify-between items-center px-4 pt-2">
          <button
            className="cursor-pointer"
            onClick={() => menuClose()}
          >
            <HiX className="text-xl" />
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-xl menu-font">
          { menus && menus.map((v, i) => (
            <button key={i} onClick={() => {onMenuClick(v.link)}} className={`transition-behavior linear duration-300 hover:text-pink-500 ${v.show ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0 pointer-events-none'}`}>{v.name}</button>
          ))}
        </div>

        {/* 하단 문구 */}
        <div className="text-center text-sm text-gray-500 p-4">
          {limit > 0 ? `❤️ 예식까지 D-${limit}일 ❤️` : limit === 0 ? "🎉 오늘은 예식일 입니다 🎉" : "🎉 예식이 종료되었습니다 🎉"}
        </div>
    </div>
  );
}
