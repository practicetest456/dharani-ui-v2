import { Navigate, Route, Routes } from 'react-router-dom';
import { MainHeader } from '@/components/common';
import { routes } from './routes';

export default function App() {
  return (
    <>
      <MainHeader />
      <Routes>
        {routes.map((r) => <Route key={r.path} path={r.path} element={r.element} />)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
