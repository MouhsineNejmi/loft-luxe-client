import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layouts/Layout';

import HomePage from '@/views/FrontOffice/HomePage';
import ListingPage from '@/views/FrontOffice/ListingPage';
// import ProtectedRoutes from './ProtectedRoutes';

const FrontOfficeRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        {/* <Route element={<ProtectedRoutes allowedRoles={['user', 'admin']} />}></Route> */}
        <Route path='/listings/:listingId' element={<ListingPage />} />
      </Route>
    </Routes>
  );
};

export default FrontOfficeRoutes;
