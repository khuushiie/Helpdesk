import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import './styles/layout.css';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import NavbarComponent from './components/NavbarComponent';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MyTickets from './pages/MyTickets';
import NewTicket from './pages/NewTicket';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import OperationDashboard from './pages/OperationDashboard';
import MyTicketsOperation from './pages/MyTicketsOperation';
import TicketApproval from './pages/TicketApproval'; 
import Performance from './pages/Performance';
import TechnicalPerformance from './pages/TechnicalPerformance';
import UserDatabase from './pages/UserDatabase'; 
import SettingsPage from './pages/Settings';
import UserLogHistory from './pages/UserLogHistory';

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const noLayoutRoutes = ['/', '/forgot-password', '/signup'];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  if (isNoLayout) {
    return children;
  }

  return (
    <>
      <NavbarComponent />
      <div className="dashboard-wrapper d-flex">
        <Sidebar />
        <div className="main-section d-flex flex-column">
          <div className="main-content flex-grow-1">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/newticket" element={<NewTicket />} />
          <Route path="/operation-dashboard" element={<OperationDashboard />} />
          <Route path="/operation/mytickets" element={<MyTicketsOperation />} />
          <Route path="/ticket-approval" element={<TicketApproval />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/technical-performance" element={<TechnicalPerformance />} />
          <Route path="/user-database" element={<UserDatabase />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/user-history" element={<UserLogHistory />} />
        </Routes>
      </LayoutWrapper>

    </BrowserRouter>
  );
}

export default App;
