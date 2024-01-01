import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layouts/Layout';

import HomePage from '@/views/FrontOffice/HomePage';
import ListingPage from '@/views/FrontOffice/ListingPage';
import TripsPage from '@/views/FrontOffice/TripsPage';
import ReservationPage from '@/views/FrontOffice/ReservationPage';
import FavoriteListingsPage from '@/views/FrontOffice/FavoriteListingsPage';
import PropertiesPage from '@/views/FrontOffice/PropertiesPage';

const FrontOfficeRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/favorites' element={<FavoriteListingsPage />} />
        <Route path='/listings/:listingId' element={<ListingPage />} />
        <Route path='/trips' element={<TripsPage />} />
        <Route path='/reservations' element={<ReservationPage />} />
        <Route path='/properties' element={<PropertiesPage />} />
      </Route>
    </Routes>
  );
};

export default FrontOfficeRoutes;
