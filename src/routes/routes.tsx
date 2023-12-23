import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FrontOfficeRoutes from './FrontOfficeRoutes';

const ApplicationRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<FrontOfficeRoutes />} />
      </Routes>
    </Router>
  );
};

export default ApplicationRoutes;
