import { Routes, Route } from 'react-router-dom';
import Invite from "@/views/Invite";
import Test from "@/views/Test";
import Admin from '@/views/Admin';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/inviteTest/test" element={<Test />} />
      <Route path="/inviteTest/admin" element={<Admin />} />
      <Route path="*" element={<Invite />} />
    </Routes>
  )
}