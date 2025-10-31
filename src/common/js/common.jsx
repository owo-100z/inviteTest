const apiBaseUrl = 'https://brjw.kro.kr/api';
// const apiBaseUrl = 'http://localhost:3021/api';
import holidayKR from "holiday-kr";
import holidays from '@/assets/holidays.json'

import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "@/components/popup";

let loadingCnt = 0;
let popupRoot = null;

let weddingData = {};

export const comm = {
  holidays: holidays,
  log: (...args) => {
    const timestamp = utils.getToday('YYYY-MM-DD HH:mm:ss.SSS');
    console.log(`[${timestamp}]: `, ...args);
  },
  error: (...args) => {
    const timestamp = utils.getToday('YYYY-MM-DD HH:mm:ss.SSS');
    console.error(`[${timestamp}]: `, ...args);
  },
  api: async (url, { method = 'GET', params, body, headers } = {}) => {
    // 기본 URL 설정
    let fullUrl = url.indexOf('http://') > -1 || url.indexOf('https://') > -1 ? url : apiBaseUrl + url;

    const loading = document.getElementById("loading-overlay");

    // GET 방식이면 params를 쿼리스트링으로 변환
    if (params && method.toUpperCase() === 'GET') {
      const query = new URLSearchParams(params).toString();
      fullUrl += `?${query}`;
    }

    // comm.log(`API Request: ${method} ${fullUrl}`);
    // if (params && method.toUpperCase() === 'GET') comm.log(`Query Parameters: ${JSON.stringify(params)}`);
    // if (body && method.toUpperCase() !== 'GET') comm.log(`Request Body: ${JSON.stringify(body)}`);
    // if (headers) comm.log(`Request Headers: ${JSON.stringify(headers)}`);

    try {
      if (loading && ++loadingCnt > 0) {
        loading.classList.remove("hidden");
      }
      const res = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: method.toUpperCase() !== 'GET' ? JSON.stringify(body) : undefined,
      });

      const data = await res.json(); // fetch 성공 시 데이터

      return data;
    } catch (e) {
      comm.log(`API Error: ${e}`);
      return { status: 'error', error: e.message };
    } finally {
      if (loading && --loadingCnt === 0) {
        loading.classList.add("hidden");
      }
    }
  },
  getWeddingData: async (id = 1) => {
    if (utils.isEmpty(weddingData)) {
      weddingData = await fetchWeddingData(id);
    } else {
      weddingData = {}
    }

    return weddingData;
  },
  toast: (message) => {
    const container = document.getElementById('toast-area');

    const toast = document.createElement("div");
    toast.className = "toast toast-center opacity-90 pointer-events-auto w-full max-w-md mx-auto lg:w-[400px] px-15";
    toast.innerHTML = `
      <div class="alert shadow-lg text-sm justify-center">
        <span">${message}</span>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('opacity-90');
      toast.classList.add("opacity-0", "transition-all", "duration-300");
      // transition 끝나면 DOM에서 제거
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }, 2000);
  }
}

export const utils = {
  isEmpty: (obj) => {
    if (obj === null || obj === undefined) return true;
    if (typeof obj === "object") {
      return Object.keys(obj).length === 0;
    }
    if (obj.length === 0) return true;
    return false;
  },
  formatPhoneNumber: (value) => {
    const onlyNums = value.replace(/\D/g, ""); // 숫자만 남김

    if (onlyNums.startsWith("02")) {
      // 서울 지역번호
      return onlyNums
        .replace(/(^02)(\d{3,4})(\d{4})$/, "$1-$2-$3");
    } else {
      // 나머지 지역번호 (010, 031, 070 등)
      return onlyNums
        .replace(/(^\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
    }
  },
  formatDate: (date, format='YYYY-MM-DD') => {
    return dayjs(date).format(format);
  },
  getToday: (format='YYYY-MM-DD') => {
    const today = dayjs();
    return today.format(format);
  },
  getDateAfterDays: (days, format='YYYY-MM-DD') => {
    const date = dayjs().add(days, 'day');
    return date.format(format);
  },
  getDayDiff: (start, end) => {
    const startDate = dayjs(start).startOf('day');
    const endDate = dayjs(end).startOf('day');
    return endDate.diff(startDate, 'day');
  },
  isHoliday : (year, month, day) => {
    day = String(day).padStart(2, '0');
    if (utils.isAltHoliday(year, month, day)) return true;
    return holidayKR.isSolarHoliday(year, month, day);
  },
  isAltHoliday : (year, month, day) => {
    const holidays = comm.holidays[year]?.filter(t => t.holiday);
    const date = `${year}-${month}-${day}`;

    // 저장된 휴일데이터 사용해 휴일정보 반환
    if (holidays.find(t => t.date === date)) return true;

    // 대체휴일 계산 로직 적용
    // 대체휴일: 하루 전날이 공휴일 + 일요일이면 대체휴일로 지정. 그외 무시
    const prevDate = dayjs(date).add(-1, 'day');
    const is_holiday = holidayKR.isSolarHoliday(prevDate.format('YYYY'), prevDate.format('MM'), prevDate.format('DD'));

    if (is_holiday && prevDate.format('d') === 0) return true;

    return false;
  }
}

export const pop_open = (content, title="") => {
  if (popupRoot) return; // 이미 열려있으면 무시

  popupRoot = document.createElement("div");
  document.body.appendChild(popupRoot);

  const root = ReactDOM.createRoot(popupRoot);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(popupRoot);
    popupRoot = null;
  };

  root.render(<Popup onClose={handleClose} title={title}>{content}</Popup>);
}

export const pop_close = () => {
  if (popupRoot) {
    document.getElementById("_popup_close")?.click();
  }
}

const fetchWeddingData = async (id = 1) => {
  const res = await comm.api(`/wedding/${id}`);
  if (res.status === 'success') {
    let result = {}
    try {
      result = JSON.parse(res.data?.wedding_data);
    } catch {
      result = {};
    }

    return result;
  } else {
    return {};
  }
}