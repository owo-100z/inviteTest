import TextBox from "@/components/TextBox";

export default function Cover() {

    const groom = "백지원"
    const bride = "이보람"

    const text = [
        '사람이 온다는 건 실은 어마어마한 일이다.',
        '그는 그의 과거와 현재와 그리고',
        '그의 미래와 함께 오기 때문이다.',
        '한 사람의 일생이 오기 때문이다.',
        '',
        '- 정현종, \'방문객\'',
        '',
        '저희 두 사람이 함께하는 새로운 시작에',
        '귀한 발걸음으로 축복해 주시면 감사하겠습니다.',
    ]

    return (
        <>
            <div className="leading-8 px-11 text-center text-gray-400">
                {text.map((t, i) => (
                    t.length > 0 ? (
                        <TextBox key={`text-${i}`}>
                            <p>{t}</p>
                        </TextBox>
                    ) : (
                        <br key={`br-${i}`} />
                    )
                ))}
            </div>
            <div className=" pt-10 text-center pb-14 hidden">
                <span>신랑 {groom} · 신부 {bride}</span>
            </div>
        </>
    )
}