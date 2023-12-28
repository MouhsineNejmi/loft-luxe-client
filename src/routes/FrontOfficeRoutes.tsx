import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layouts/Layout';

import HomePage from '@/views/FrontOffice/HomePage';
import ProtectedRoutes from './ProtectedRoutes';

const FrontOfficeRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes allowedRoles={['user', 'admin']} />}>
          {/* <Route index path='favorites/:listingId' element={} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default FrontOfficeRoutes;
