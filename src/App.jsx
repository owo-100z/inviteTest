import { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from "@/components/routers/Router";

export default function App() {
  return (
    <Router>
      {/* 로오오딩 */}
      {/* <div id="loading-overlay" className="fixed bg-black/50 z-50 flex items-center justify-center inset-0 hidden">
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div> */}
      {/* 토스트 메시지 */}
      <div id="toast-area" className="fixed bottom-4 inset-x-0 flex flex-col gap-2 justify-center z-9999 pointer-events-none"></div>
      <AppRouter/>
    </Router>
  );
}