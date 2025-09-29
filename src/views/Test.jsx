import Intro from "@/components/Intro";
import Cover1 from "@/components/cover/Cover1";
import Layout from "@/components/layouts/Layout";
import Header from "@/components/layouts/Header";
import Greetings from "@/components/Greetings";
import Cover2 from "@/components/cover/Cover2";

export default function Test() {
    return (
        <Layout>
            <Header />
            {/* <Intro /> */}
            <Cover1 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람" imgUrl="https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg,https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg"/>
            <Cover2 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람"  imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg"/>
            <Cover2 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람" imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg"/>
            <Greetings />
        </Layout>
    )
}