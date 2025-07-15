import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import HomestayDetail from './pages/HomestayDetail';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AboutUs from './pages/AboutUs';
import ContactUs from './components/ContactUs';
import ContactPanel from './components/ContactPanel';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#ffe6d8' }}>
        <Toaster position="top-right" />
        <Header />
        <main className="flex-grow-1 py-4">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/detail/:id" element={<HomestayDetail />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </main>
        <Footer />
        <ContactPanel />
      </div>
    </Router>
  );
}

export default App;
