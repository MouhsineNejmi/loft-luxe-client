import Navbar from '../Navbar/Navbar';
import RegisterModal from '../Modals/RegisterModal';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <>
        <Navbar />
        <RegisterModal />
      </>
      {children}
    </div>
  );
};

export default Layout;
