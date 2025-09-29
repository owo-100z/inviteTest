import { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";

const menuItems = [
  { name: "메인", link: "#main", show: false },
  { name: "글귀", link: "#quote", show: false },
  { name: "함께한 시간", link: "#timeline", show: false },
  { name: "인사말", link: "#greeting", show: false },
  { name: "소개", link: "#introduction", show: false },
  { name: "달력", link: "#calendar", show: false },
  { name: "안내사항", link: "#information", show: false },
  { name: "계좌번호", link: "#account", show: false },
  { name: "오시는 길", link: "#location", show: false },
  { name: "게스트북", link: "#guestbook", show: false },
  { name: "갤러리", link: "#gallery", show: false },
];

const weddingDate = dayjs('2026-06-13');

let scrollY = 0;

export default function MenuOverlay({ close = () => {} }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [menus, setMenus] = useState(menuItems);
  const [limit, setLimit] = useState(weddingDate.diff(dayjs(), 'day'));

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

  return (
    <div className={`fixed inset-0 z-50 w-full h-dvh flex flex-col bg-white/50 transition-behavior duration-500 ease-in-out backdrop-blur-sm ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* 닫기 버튼 */}
        <div className="flex justify-between items-center px-4 pt-2">
        <button
            onClick={() => menuClose()}
        >
            <HiX />
        </button>
        </div>

        {/* 메뉴 리스트 */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-xl menu-font">
          { menus && menus.map((v, i) => (
            <button key={i} className={`transition-behavior linear duration-300 hover:text-pink-500 ${v.show ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0 pointer-events-none'}`}>{v.name}</button>
          ))}
        </div>

        {/* 하단 문구 */}
        <div className="text-center text-sm text-gray-500 p-4">
          {limit > 0 ? `❤️ 예식까지 D-${limit}일 ❤️` : "🎉 예식이 시작되었습니다 🎉"}
        </div>
    </div>
  );
}
