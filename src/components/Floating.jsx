import { HiOutlineShare } from "react-icons/hi";

export default function Floating({ wedding_data }) {
    const share = () => {
        if (navigator.share) {
            navigator.share({
                title: wedding_data?.title,
                url: wedding_data?.url,
            });
        } else {
            alert('공유 기능을 지원하지 않는 브라우저입니다.');
        }
    }
    return (
        <div className="fab">
            <button className="btn btn-lg btn-circle opacity-70" onClick={share}>
                <HiOutlineShare />
            </button>
        </div>
    )
}