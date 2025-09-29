// const apiBaseUrl = '/api';
const apiBaseUrl = 'http://158.179.163.208/api';

let loadingCnt = 0;

export const comm = {
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
    let fullUrl = apiBaseUrl + url;

    // GET 방식이면 params를 쿼리스트링으로 변환
    if (params && method.toUpperCase() === 'GET') {
      const query = new URLSearchParams(params).toString();
      fullUrl += `?${query}`;
    }

    comm.log(`API Request: ${method} ${fullUrl}`);
    if (params && method.toUpperCase() === 'GET') comm.log(`Query Parameters: ${JSON.stringify(params)}`);
    if (body && method.toUpperCase() !== 'GET') comm.log(`Request Body: ${JSON.stringify(body)}`);
    if (headers) comm.log(`Request Headers: ${JSON.stringify(headers)}`);

    try {
      if (++loadingCnt > 0) {
        document.getElementById("loading-overlay").classList.remove("hidden");
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
      if (--loadingCnt === 0) {
        document.getElementById("loading-overlay").classList.add("hidden");
      }
    }
  },
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
  getToday: (format='YYYY-MM-DD') => {
    const today = dayjs();
    return today.format(format);
  },
  getDateAfterDays: (days, format='YYYY-MM-DD') => {
    const date = dayjs().add(days, 'day');
    return date.format(format);
  },
  getDayDiff: (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    return endDate.diff(startDate, 'day');
  },
}