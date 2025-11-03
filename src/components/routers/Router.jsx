import { Routes, Route } from 'react-router-dom';
import Invite from "@/views/Invite";
import Test from "@/views/Test";
import Admin from '@/views/Admin';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Invite />} />
    </Routes>
  )
}