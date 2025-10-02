import Intro from "@/components/Intro";
import Cover1 from "@/components/cover/Cover1";
import Layout from "@/components/layouts/Layout";
import Header from "@/components/layouts/Header";
import Greetings from "@/components/Greetings";
import Calendar from "@/components/Calendar";
import About from "@/components/About";
import Cover2 from "@/components/cover/Cover2";
import Location from "@/components/Location";
import LocationMap from "@/components/LocationMap";
import Directions from "@/components/Directions";
import Box from "@/components/layouts/Box";

export default function Test() {
    return (
        <Layout>
            <Header />
            <Intro />
            <Cover1 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람" imgUrl="https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg,https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg"/>
            <Cover2 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람"  imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg"/>
            <Cover2 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람" imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg"/>
            <Box idx={0} title="Greetings"> <Greetings /> </Box>
            <Box idx={0}> <About /> </Box>
            <Box idx={1}> <Calendar /> </Box>
            <Box idx={2} title="Location"> <Location /> </Box>
            <Box idx={2}> <LocationMap /> </Box>
            <Box idx={2}> <Directions /> </Box>
        </Layout>
    )
}