export default function Layout({ children }) {
    return (
        <div className="md:py-5 rounded-3xl">
            <div className="flex flex-col justify-center h-full max-w-xl mx-auto rounded-3xl shadow-xl relative bg-white font-suit">
                { children }
            </div>
        </div>
    )
}