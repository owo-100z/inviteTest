import Calligraphy from "@/components/Calligraphy";

export default function Cover() {

    return (
        <div className="w-full h-full min-h-80 pt-14 bg-white break-keep">
            <div className="w-full flex justify-center">
                <div className="mb-10">
                    <div className="w-[160px] h-auto">
                        <Calligraphy
                            id="greetings"
                            str="Greetings"
                            fontSize={24}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
            <div className="leading-8 px-11 text-center text-sm text-gray-400">
                <p className="gsap-text">
                    <span className="gsap-text">사람이 온다는 건 실은 어마어마한 일이다.</span>
                </p>
                <p className="gsap-text">
                    <span className="gsap-text">그는 그의 과거와 현재와 그리고</span>
                </p>
                <p className="gsap-text">
                    <span className="gsap-text">그의 미래와 함께 오기 때문이다.</span>
                </p>
                <p className="gsap-text">한 사람의 일생이 오기 때문이다.</p><br />
                <p className="gsap-text">- 정현종, '방문객'</p><br />
                <p className="gsap-text">저희 두 사람이 함께하는 새로운 시작에</p>
                <p className="gsap-text">귀한 발걸음으로 축복해 주시면 감사하겠습니다.</p>
            </div>
        </div>
    )
}