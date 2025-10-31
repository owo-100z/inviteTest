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
import { useEffect, useState } from "react";

export default function Test() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await comm.getWeddingData();

        if(!utils.isEmpty(res)) {
            // comm.log(res);
            setData(res);
            document.title = res?.title || '우리 결혼합니다 💍';
        }
    }
    return (
        <Layout>
            <Header wedding_data={data} />
            <Floating wedding_data={data} />
            {/* <Intro /> */}
            <Cover1 wedding_data={data} imgUrl="https://hellomybrand.com/wed/images/sample/cover/seoul-1.jpg,https://hellomybrand.com/wed/images/sample/cover/seoul-2.jpg"/>
            {/* <Cover2 wedding_data={data} imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg"/>
            <Cover2 wedding_data={data} imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/newyork.jpg"/> */}
            <Box id="greetings" idx={0} title="Greetings" className="font-saeum text-xl"> <Greetings wedding_data={data} /> </Box>
            <Box id="introduction" idx={1}> <About wedding_data={data} /> </Box>
            <Box id="calendar" idx={2}> <Calendar wedding_data={data} /> </Box>
            <Box id="location" idx={0} title="Location"> <Location wedding_data={data} /> </Box>
            <Box idx={0}> <LocationMap /> </Box>
            <Box idx={0}> <Directions /> </Box>
            <Box id="notice" idx={0}> <Notice wedding_data={data} /> </Box>
            <Box id="gallery" idx={1} title="Gallery"> <Gallery /> </Box>
            <Box id="message" idx={2} title="Message"> <Message /> </Box>
            <Box id="account" idx={0}> <Account wedding_data={data} /> </Box>
            <Ending imgUrl="https://hellomybrand.com/wed/images/sample/cover/wm/martinique.jpg"/>
        </Layout>
    )
}