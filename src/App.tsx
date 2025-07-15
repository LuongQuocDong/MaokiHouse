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
            <Route path="/contact" element={<Pages.ContactUs />} />
            <Route path="/detail/:id" element={<Pages.HomestayDetail />} />
            <Route path="/admin" element={<Pages.AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Pages.AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </PageTransition>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#ffe6d8' }}>
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
