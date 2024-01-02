import { Toaster } from 'react-hot-toast';
import ApplicationRoutes from './routes/routes';

const App = () => {
  return (
    <>
      <Toaster />
      <ApplicationRoutes />
    </>
  );
};

export default App;
