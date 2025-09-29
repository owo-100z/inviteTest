import { Routes, Route } from 'react-router-dom';
import Invite from "@/views/Invite";
import Test from "@/views/Test";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Invite />} />
    </Routes>
  )
}