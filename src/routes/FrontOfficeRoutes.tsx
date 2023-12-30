import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layouts/Layout';

import HomePage from '@/views/FrontOffice/HomePage';
import ListingPage from '@/views/FrontOffice/ListingPage';
import TripsPage from '@/views/FrontOffice/TripsPage';
import ReservationPage from '@/views/FrontOffice/ReservationPage';

const FrontOfficeRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/listings/:listingId' element={<ListingPage />} />
        <Route path='/trips' element={<TripsPage />} />
        <Route path='/reservations' element={<ReservationPage />} />
      </Route>
    </Routes>
  );
};

export default FrontOfficeRoutes;
