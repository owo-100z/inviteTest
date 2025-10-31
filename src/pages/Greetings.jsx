import TextBox from "@/components/TextBox";

export default function Greetings({wedding_data}) {
    const text = wedding_data?.greetings?.split('\n');

    return (
        <>
            <div className="leading-8 px-11 text-center text-gray-400">
                {text && text.map((t, i) => (
                    t.length > 0 ? (
                        <TextBox key={`text-${i}`}>
                            <p>{t}</p>
                        </TextBox>
                    ) : (
                        <br key={`br-${i}`} />
                    )
                ))}
            </div>
            <div className=" pt-10 text-center pb-8">
                <span className="text-2xl">신랑 {wedding_data?.groom} · 신부 {wedding_data?.bride}</span>
            </div>
        </>
    )
}