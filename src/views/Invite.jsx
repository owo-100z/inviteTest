import Intro from "@/components/Intro";
import Cover1 from "@/components/cover/Cover1";
import Layout from "@/components/layouts/Layout";
import Header from "@/components/layouts/Header";
import Greetings from "@/pages/Greetings";
import Calendar from "@/pages/Calendar";
import About from "@/pages/About";
import Cover2 from "@/components/cover/Cover2";
import Location from "@/pages/Location";
import LocationMap from "@/pages/LocationMap";
import Directions from "@/pages/Directions";
import Gallery from "@/pages/Gallery";
import Message from "@/pages/Message";
import Account from "@/pages/Account";
import Notice from "@/pages/Notice";
import Box from "@/components/Box";
import Ending from "@/components/cover/Ending";
import Floating from "@/components/Floating";

export default function Test() {
    return (
        <Layout>
            <Header />
            <Floating />
            <Intro />
            <Cover1 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람" imgUrl="https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg,https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg"/>
            {/* <Cover2 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람"  imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg"/>
            <Cover2 date="2026-06-13 14:30" name_en="JIWON & BORAM" name_kr="백지원 · 이보람" imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg"/> */}
            <Box id="greetings" idx={0} title="Greetings" className="font-saeum text-xl"> <Greetings /> </Box>
            <Box id="introduction" idx={1}> <About /> </Box>
            <Box id="calendar" idx={2}> <Calendar /> </Box>
            <Box id="location" idx={0} title="Location"> <Location /> </Box>
            <Box idx={0}> <LocationMap /> </Box>
            <Box idx={0}> <Directions /> </Box>
            <Box id="notice" idx={0}> <Notice /> </Box>
            <Box id="gallery" idx={1} title="Gallery"> <Gallery /> </Box>
            <Box id="message" idx={2} title="Message"> <Message /> </Box>
            <Box id="account" idx={0}> <Account /> </Box>
            <Ending imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg"/>
        </Layout>
    )
}