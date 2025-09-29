import { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from "@/components/routers/Router";

export default function App() {
  useEffect(() => {
    // 스크롤 복원 막기
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 새로고침 시 맨 위로
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <Router>
      <div id="loading-overlay" className="fixed bg-black/50 z-50 flex items-center justify-center inset-0 hidden">
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div>
      <AppRouter/>
    </Router>
  );
}