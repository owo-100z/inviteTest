import { HiOutlineShare } from "react-icons/hi";

export default function Floating() {
    const share = () => {
        if (navigator.share) {
            navigator.share({
                title: '우리 결혼합니다 💍',
                url: 'https://owo-100z.github.io/inviteTest/',
            });
        } else {
            alert('공유 기능을 지원하지 않는 브라우저입니다.');
        }
    }
    return (
        <div className="fab">
            <button className="btn btn-lg btn-circle opacity-30" onClick={share}>
                <HiOutlineShare />
            </button>
        </div>
    )
}