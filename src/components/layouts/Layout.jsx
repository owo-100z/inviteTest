export default function Layout({ children }) {
    return (
        <div className="md:py-12 rounded-3xl">
            <div className="flex flex-col justify-center h-full max-w-md mx-auto rounded-3xl shadow-xl lg:w-[400px] relative bg-white font-suit">
                { children }
            </div>
        </div>
    )
}