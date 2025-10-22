import Container from "@/components/Container"

export default function Notice() {
    const title = "안내사항"
    const description = [
        '화환 반입이 불가한 장소이오니',
        '화환은 정중히 사양합니다.',
        '',
        '따뜻한 마음에 깊이 감사드립니다.'
    ];
    
    return (
        <Container title={title} description={description} />
    )
}