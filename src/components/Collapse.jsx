import { useState } from "react"

export default function Collapse({ children, title, color }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-base-300 rounded-xl p-1">
            <button className={`w-full text-left font-semibold p-3 cursor-pointer
                ${color ? color : ''}`} onClick={() => setOpen(!open)} >
                    {title}
            </button>
            <div className={`overflow-hidden transition-all duration-700
                ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                    {children}
            </div>
        </div>
    )
}