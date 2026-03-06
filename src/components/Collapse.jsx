import { useState } from "react"
import { HiChevronDown } from "react-icons/hi";

export default function Collapse({ children, title, color }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-base-300 rounded-xl p-1">
            <button 
                className={`w-full flex justify-between items-center text-left font-semibold p-3 cursor-pointer 
                    ${color ? color : ''}`} 
                onClick={() => setOpen(!open)} 
            >
                <span>{title}</span>
                
                {/* open일 때 rotate-180이 적용되어 화살표가 위(↑)를 향하게 됩니다 */}
                <HiChevronDown 
                    className={`text-2xl transition-transform duration-300 ease-in-out
                        ${open ? "rotate-180" : "rotate-0"}`} 
                />
            </button>

            <div className={`overflow-hidden transition-all duration-500
                ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-3 border-t border-base-200"> 
                    {children}
                </div>
            </div>
        </div>
    )
}