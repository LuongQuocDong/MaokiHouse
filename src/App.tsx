import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ContactPanel from './components/ContactPanel';
import PageTransition from './components/PageTransition';
import LoadingSpinner from './components/LoadingSpinner';
import { Suspense } from 'react';
import * as Pages from './pages';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingSpinner />}>
        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/about" element={<Pages.AboutUs />} />
            <Route path="/features" element={<Pages.Features />} />
            <Route path="/pricing" element={<Pages.Pricing />} />
            <Route path="/services" element={<Pages.Services />} />
            <Route path="/contact" element={<Pages.ContactUs />} />
            <Route path="/detail/:id" element={<Pages.HomestayDetail />} />
            <Route path="/admin" element={<Pages.AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Pages.DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Pages.DashboardOverview />} />
              <Route path="properties" element={<Pages.DashboardProperties />} />
              <Route path="bookings" element={<Pages.DashboardBookings />} />
              <Route path="calendar" element={<Pages.DashboardCalendar />} />
              <Route path="messages" element={<Pages.DashboardMessages />} />
              <Route path="revenue" element={<Pages.DashboardRevenue />} />
              <Route path="hr" element={<Pages.DashboardHR />} />
              <Route path="ai-support" element={<Pages.DashboardAISupport />} />
              <Route path="channels" element={<Pages.DashboardChannels />} />
            </Route>
          </Routes>
        </PageTransition>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--color-background)' }}>
        <Toaster position="top-right" />
        <Header />
        <main className="flex-grow-1 py-4">
          <Container>
            <AppRoutes />
          </Container>
        </main>
        <Footer />
        <ContactPanel />
      </div>
    </Router>
  );
}

export default App;
