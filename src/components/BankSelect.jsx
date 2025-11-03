import React, { useState, useRef, useEffect } from "react";

/**
 * props:
 * - banks: [{ code, name, logo? }]
 * - value: selected bank code
 * - onChange: (bankObj) => void  // 전체 객체 반환
 * - placeholder: string
 * - searchable: boolean (default true)
 */
export default function BankSelectSearchable({
//   banks = [],
  value = "",
  onChange = () => {},
  placeholder = "은행선택",
  searchable = true,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);

  const banks = [
    {code: '002', logo: '/banks/002.png', name: 'KDB산업은행'},
    {code: '003', logo: '/banks/003.png', name: 'IBK기업은행'},
    {code: '004', logo: '/banks/004.png', name: 'KB국민은행'},
    // {code: '005', logo: '/banks/005.png', name: 'KEB하나은행'},
    {code: '007', logo: '/banks/007.png', name: '수협은행'},
    {code: '011', logo: '/banks/011.png', name: 'NH농협은행'},
    {code: '020', logo: '/banks/020.png', name: '우리은행'},
    {code: '023', logo: '/banks/023.png', name: 'SC은행'},
    {code: '027', logo: '/banks/027.png', name: '씨티은행'},
    {code: '031', logo: '/banks/031.png', name: '대구은행'},
    {code: '032', logo: '/banks/032.png', name: '부산은행'},
    {code: '034', logo: '/banks/034.png', name: '광주은행'},
    {code: '035', logo: '/banks/088.png', name: '제주은행'},
    {code: '037', logo: '/banks/037.png', name: '전북은행'},
    {code: '039', logo: '/banks/032.png', name: '경남은행'},
    {code: '045', logo: '/banks/045.png', name: 'MG새마을금고'},
    {code: '048', logo: '/banks/048.png', name: '신협'},
    {code: '050', logo: '/banks/050.png', name: '저축은행'},
    {code: '064', logo: '/banks/064.png', name: '산림조합'},
    {code: '071', logo: '/banks/071.png', name: '우체국'},
    {code: '081', logo: '/banks/005.png', name: '하나은행'},
    {code: '088', logo: '/banks/088.png', name: '신한은행'},
    {code: '089', logo: '/banks/089.png', name: '케이뱅크'},
    {code: '090', logo: '/banks/090.png', name: '카카오뱅크'},
    {code: '092', logo: '/banks/092.png', name: '토스뱅크'},
    {code: '103', logo: '/banks/103.png', name: 'SBI저축은행'},
    // 증권 사용X
    // {code: '218', logo: '218', name: 'KB증권'},
    // {code: '230', logo: '230', name: '미래에셋증권'},
    // {code: '238', logo: '238', name: '미래에셋증권'},
    // {code: '240', logo: '240', name: '삼성증권'},
    // {code: '243', logo: '243', name: '한국투자증권'},
    // {code: '247', logo: '247', name: 'NH투자증권'},
    // {code: '261', logo: '261', name: '교보증권'},
    // {code: '262', logo: '262', name: '하이투자증권'},
    // {code: '263', logo: '263', name: '현대차투자증권'},
    // {code: '264', logo: '264', name: '키움증권'},
    // {code: '265', logo: '265', name: '이베스트증권'},
    // {code: '266', logo: '266', name: 'SK증권'},
    // {code: '267', logo: '267', name: '대신증권'},
    // {code: '269', logo: '269', name: '한화투자증권'},
    // {code: '270', logo: '270', name: '하나증권'},
    // {code: '271', logo: '271', name: '토스증권'},
    // {code: '278', logo: '278', name: '신한투자증권'},
    // {code: '279', logo: '279', name: 'DB금융투자'},
    // {code: '280', logo: '280', name: '유진투자'},
    // {code: '287', logo: '287', name: '메리츠증권'},
    // {code: '888', logo: '888', name: '토스머니'},
    // {code: '889', logo: '889', name: '토스포인트'},
  ];

  // 현재 선택된 은행 객체
  const selected = banks.find((b) => b.code === value) || null;

  // 필터링 (이름/코드)
  const filtered = banks.filter((b) =>
    `${b.name} ${b.code}`.toLowerCase().includes(query.toLowerCase())
  );

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleSelect = (bank) => {
    setOpen(false);
    setQuery("");
    onChange({code: bank.code, name: bank.name});
  };

  return (
    <div ref={rootRef} className="relative w-[45%]">
      <button
        type="button"
        className="btn bg-white border-gray w-full justify-between text-left rounded-lg opacity-70 p-2"
        onClick={() => setOpen((s) => !s)}
      >
        <div className="flex items-center gap-2">
          {selected?.logo ? (
            <img src={selected.logo} alt={selected.name} className="w-6 h-6 rounded" />
          ) : (
            <div className="w-6 h-6 rounded bg-base-300 flex items-center justify-center text-xs">
              {selected ? selected.name.slice(0, 1) : "B"}
            </div>
          )}
          <div className="truncate">
            <span className="text-xs">
                {selected ? selected.name : placeholder}
            </span>
          </div>
        </div>
        <span className="opacity-60">▾</span>
      </button>

      {open && (
        <div className="absolute mt-2 z-50 w-[200px] bg-base-100 border border-base-300 rounded-lg shadow-lg overflow-hidden">
          {searchable && (
            <div className="p-2">
              <input
                className="input input-bordered w-full"
                placeholder="검색 (은행명 또는 코드)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
          )}

          <div className="max-h-56 overflow-auto">
            {filtered.length === 0 ? (
              <div className="p-4 text-sm text-center text-muted">검색결과 없음</div>
            ) : (
              filtered.map((b) => (
                <button
                  key={b.code}
                  onClick={() => handleSelect(b)}
                  className="flex items-center gap-3 w-full px-3 py-2 hover:bg-base-200 text-left text-sm"
                >
                  {b.logo ? (
                    <img src={b.logo} alt={b.name} className="w-8 h-8 rounded" />
                  ) : (
                    <div className="w-8 h-8 rounded bg-base-300 flex items-center justify-center">
                      {b.name.slice(0, 1)}
                    </div>
                  )}
                  <div>
                    {b.name}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
