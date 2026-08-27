import { Suspense } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../../config/firebase';
import {
  FaChartLine,
  FaHome,
  FaCalendarCheck,
  FaCalendarAlt,
  FaEnvelope,
  FaMoneyBillWave,
  FaUsers,
  FaRobot,
  FaPlug,
} from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Overview', icon: FaChartLine, end: true },
  { to: '/admin/dashboard/properties', label: 'Properties', icon: FaHome },
  { to: '/admin/dashboard/bookings', label: 'Bookings', icon: FaCalendarCheck },
  { to: '/admin/dashboard/calendar', label: 'Calendar', icon: FaCalendarAlt },
  { to: '/admin/dashboard/messages', label: 'Messages', icon: FaEnvelope },
  { to: '/admin/dashboard/revenue', label: 'Revenue', icon: FaMoneyBillWave },
  { to: '/admin/dashboard/hr', label: 'HR', icon: FaUsers },
  { to: '/admin/dashboard/ai-support', label: 'AI Support', icon: FaRobot },
  { to: '/admin/dashboard/channels', label: 'Channels', icon: FaPlug },
];

const DashboardLayout = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Đã đăng xuất');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Đăng xuất thất bại');
    }
  };

  return (
    <div className="dashboard-shell full-bleed">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo">
          <span className="dashboard-logo-mark">MK</span>
          <span className="dashboard-logo-text">MaokiHouse</span>
        </Link>
        <nav className="dashboard-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `dashboard-nav-link${isActive ? ' active' : ''}`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-title">Host Dashboard</div>
          <div className="dashboard-topbar-user">
            <span className="dashboard-user-email">{user?.email}</span>
            <button type="button" className="dashboard-logout-btn" onClick={handleLogout}>
              <BiLogOut size={18} />
              Đăng xuất
            </button>
          </div>
        </header>
        <main className="dashboard-content">
          <Suspense
            fallback={
              <div className="d-flex justify-content-center align-items-center py-5">
                <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
              </div>
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>

      <style>
        {`
          .dashboard-shell {
            display: flex;
            min-height: 100vh;
            margin-top: -1.5rem;
            margin-bottom: -1.5rem;
            background: var(--color-cream);
          }

          .dashboard-sidebar {
            width: 260px;
            flex-shrink: 0;
            background: var(--color-charcoal);
            color: var(--color-cream);
            display: flex;
            flex-direction: column;
            padding: 1.5rem 1rem;
            position: sticky;
            top: 0;
            align-self: stretch;
            min-height: 100vh;
          }

          .dashboard-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            margin-bottom: 2rem;
            padding: 0 0.5rem;
          }

          .dashboard-logo-mark {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-display);
            font-weight: 700;
            background: linear-gradient(135deg, var(--color-gold), var(--color-primary-light));
            color: var(--color-ink);
          }

          .dashboard-logo-text {
            font-family: var(--font-display);
            font-size: 1.15rem;
            color: var(--color-cream);
          }

          .dashboard-nav {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .dashboard-nav-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.7rem 0.9rem;
            border-radius: 10px;
            color: var(--color-cream);
            opacity: 0.75;
            text-decoration: none;
            font-family: var(--font-body);
            font-size: 0.95rem;
            transition: all 0.2s ease;
          }

          .dashboard-nav-link:hover {
            opacity: 1;
            background: rgba(255,255,255,0.06);
          }

          .dashboard-nav-link.active {
            opacity: 1;
            background: rgba(201, 161, 90, 0.16);
            color: var(--color-gold-light);
            box-shadow: inset 3px 0 0 var(--color-gold);
          }

          .dashboard-main {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
          }

          .dashboard-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.1rem 1.75rem;
            background: var(--color-white, #fff);
            border-bottom: 1px solid rgba(43, 24, 16, 0.08);
            position: sticky;
            top: 0;
            z-index: 5;
          }

          .dashboard-topbar-title {
            font-family: var(--font-display);
            font-size: 1.25rem;
            color: var(--color-ink);
          }

          .dashboard-topbar-user {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .dashboard-user-email {
            font-size: 0.9rem;
            color: var(--color-ink);
            opacity: 0.7;
          }

          .dashboard-logout-btn {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            border: none;
            border-radius: 999px;
            padding: 0.5rem 1.1rem;
            background: linear-gradient(135deg, var(--color-gold), var(--color-primary-light));
            color: var(--color-ink);
            font-weight: 600;
            font-size: 0.85rem;
            cursor: pointer;
          }

          .dashboard-content {
            padding: 1.75rem;
            flex: 1;
          }

          @media (max-width: 900px) {
            .dashboard-shell {
              flex-direction: column;
            }
            .dashboard-sidebar {
              width: 100%;
              height: auto;
              position: relative;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
            }
            .dashboard-nav {
              flex-direction: row;
              flex-wrap: wrap;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DashboardLayout;
