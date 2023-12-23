import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layouts/Layout';

import HomePage from '@/views/FrontOffice/HomePage';

const FrontOfficeRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default FrontOfficeRoutes;
