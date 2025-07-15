import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../config/firebase';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { BiLogOut } from 'react-icons/bi';
import { FaInfoCircle, FaEnvelope, FaChartBar } from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface NavButtonProps {
  to: string;
  icon: IconType;
  children: ReactNode;
  mobile?: boolean;
}

const Header = () => {
  const [user] = useAuthState(auth);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      setExpanded(false);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  const navLinkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const mobileNavLinkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const NavButton = ({ to, icon: Icon, children, mobile = false }: NavButtonProps) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: 'inline-block' }}
    >
      <Link
        to={to}
        onClick={() => mobile && setExpanded(false)}
        className="text-decoration-none"
      >
        <div
          className="d-flex align-items-center gap-2"
          style={{
            backgroundColor: location.pathname === to ? '#ffe6d8' : 'transparent',
            border: '2px solid #ffe6d8',
            color: location.pathname === to ? '#824a39' : '#ffe6d8',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            if (location.pathname !== to) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 230, 216, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (location.pathname !== to) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Icon size={20} />
          {children}
        </div>
      </Link>
    </motion.div>
  );

  const LogoutButton = ({ mobile = false }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: 'inline-block' }}
    >
      <Button
        onClick={() => {
          handleLogout();
          if (mobile) setExpanded(false);
        }}
        className="d-flex align-items-center gap-2"
        style={{
          backgroundColor: '#ffe6d8',
          border: '2px solid #ffe6d8',
          color: '#824a39',
          padding: '0.5rem 1rem',
          borderRadius: '25px',
          fontSize: '1.1rem',
          fontWeight: '500',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#824a39';
          e.currentTarget.style.color = '#ffe6d8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffe6d8';
          e.currentTarget.style.color = '#824a39';
        }}
      >
        <BiLogOut size={20} />
        Logout
      </Button>
    </motion.div>
  );

  return (
    <Navbar 
      bg="custom" 
      expand="lg" 
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      className="navbar-custom"
      style={{ 
        backgroundColor: '#824a39',
        marginBottom: '2rem'
      }}
      as={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/"
          onClick={() => setExpanded(false)}
          className="p-0"
        >
          <motion.img 
            src="https://res.cloudinary.com/dlkejgkqk/image/upload/v1752607273/logo_gkzxvs.png" 
            alt="Maoki House" 
            style={{ width: '150px' }} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="navbar-nav" 
          style={{ 
            border: 'none',
            padding: '0.25rem'
          }}
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            className="navbar-toggler-icon" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(253, 242, 233, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`
            }}
            animate={expanded ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <AnimatePresence mode="wait">
              {isMobile ? (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate={expanded ? "open" : "closed"}
                  className="w-100"
                >
                  <motion.div
                    key={location.pathname}
                    variants={navLinkVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="d-flex flex-column align-items-start gap-3 w-100 py-3"
                  >
                    <motion.div variants={mobileNavLinkVariants}>
                      <NavButton to="/about" icon={FaInfoCircle} mobile>About Us</NavButton>
                    </motion.div>

                    <motion.div variants={mobileNavLinkVariants}>
                      <NavButton to="/contact" icon={FaEnvelope} mobile>Contact Us</NavButton>
                    </motion.div>

                    {user && (
                      <>
                        <motion.div variants={mobileNavLinkVariants}>
                          <NavButton to="/admin/dashboard" icon={FaChartBar} mobile>Dashboard</NavButton>
                        </motion.div>

                        <motion.div variants={mobileNavLinkVariants} className="mt-2">
                          <LogoutButton mobile />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={location.pathname}
                  variants={navLinkVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="d-flex align-items-center gap-3"
                >
                  <NavButton to="/about" icon={FaInfoCircle}>About Us</NavButton>
                  <NavButton to="/contact" icon={FaEnvelope}>Contact Us</NavButton>

                  {user && (
                    <>
                      <NavButton to="/admin/dashboard" icon={FaChartBar}>Dashboard</NavButton>
                      <div className="ms-2">
                        <LogoutButton />
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 