import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../config/firebase';
import { CONTACT_LINKS } from '../../constants/contact';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { BiLogOut } from 'react-icons/bi';
import { FaInfoCircle, FaEnvelope, FaChartBar, FaHome, FaCalendarAlt } from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface NavButtonProps {
  to: string;
  icon: IconType;
  children: ReactNode;
  mobile?: boolean;
  external?: boolean;
}

const Header = () => {
  const [user] = useAuthState(auth);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled && !expanded;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const NavButton = ({ to, icon: Icon, children, mobile = false, external = false }: NavButtonProps) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: 'inline-block' }}
    >
      {external ? (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => mobile && setExpanded(false)}
          className="text-decoration-none"
        >
          <div className="header-nav-pill header-nav-pill-solid">
            <Icon size={20} />
            {children}
          </div>
        </a>
      ) : (
        <Link
          to={to}
          onClick={() => mobile && setExpanded(false)}
          className="text-decoration-none"
        >
          <div
            className={`header-nav-pill ${location.pathname === to ? 'header-nav-pill-active' : 'header-nav-pill-outline'}`}
          >
            <Icon size={20} />
            {children}
          </div>
        </Link>
      )}
    </motion.div>
  );

  const LogoutButton = ({ mobile = false }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: 'inline-block' }}
    >
      <Button
        variant="light"
        onClick={() => {
          handleLogout();
          if (mobile) setExpanded(false);
        }}
        className="d-flex align-items-center gap-2 header-nav-pill header-nav-pill-solid"
        style={{ border: '2px solid #ffe6d8' }}
      >
        <BiLogOut size={20} />
        Logout
      </Button>
    </motion.div>
  );

  // Book Now button for mobile view - styled to match other header buttons
  const BookNowMobileButton = () => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: expanded ? 'none' : 'inline-block', // Hide when menu is expanded
        position: 'absolute',
        right: '75px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1031
      }}
    >
      <a
        href={CONTACT_LINKS.airbnb}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <div className="header-nav-pill header-nav-pill-solid header-nav-pill-small">
          <FaCalendarAlt size={16} />
          Book Now
        </div>
      </a>
    </motion.div>
  );

  return (
    <Navbar
      bg="custom"
      expand="lg"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      className={`navbar-custom ${transparent ? 'navbar-transparent' : 'navbar-solid'}`}
      as={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <Container className="position-relative"> {/* Added position-relative for absolute positioning context */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => setExpanded(false)}
          className="p-0"
        >
          <motion.img
            src={CONTACT_LINKS.logoURL}
            alt="Maoki House"
            style={{ width: '150px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        </Navbar.Brand>

        {isMobile && <BookNowMobileButton />}

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
              backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(253, 246, 238, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`
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
                      <NavButton to="/" icon={FaHome} mobile>Home</NavButton>
                    </motion.div>

                    <motion.div variants={mobileNavLinkVariants}>
                      <NavButton to="/about" icon={FaInfoCircle} mobile>About Us</NavButton>
                    </motion.div>

                    <motion.div variants={mobileNavLinkVariants}>
                      <NavButton to="/contact" icon={FaEnvelope} mobile>Contact Us</NavButton>
                    </motion.div>

                    <motion.div variants={mobileNavLinkVariants}>
                      <NavButton to={CONTACT_LINKS.airbnb} icon={FaCalendarAlt} mobile external>Book Now</NavButton>
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
                  <NavButton to="/" icon={FaHome}>Home</NavButton>
                  <NavButton to="/about" icon={FaInfoCircle}>About Us</NavButton>
                  <NavButton to="/contact" icon={FaEnvelope}>Contact Us</NavButton>
                  <NavButton to={CONTACT_LINKS.airbnb} icon={FaCalendarAlt} external>Book Now</NavButton>
                  {user && (
                    <>
                      <NavButton to="/admin/dashboard" icon={FaChartBar}>Dashboard</NavButton>
                      <LogoutButton />
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style>
        {`
          .navbar-custom {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1030;
            transition: background-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease, padding 0.4s ease;
            padding: 1.1rem 0;
          }

          .navbar-transparent {
            background-color: transparent !important;
            box-shadow: none;
          }

          .navbar-solid {
            background-color: rgba(28, 19, 16, 0.92) !important;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
            padding: 0.6rem 0;
          }

          .header-nav-pill {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.25rem;
            font-family: var(--font-body);
            font-size: 1rem;
            font-weight: 500;
            transition: color 0.3s ease;
            white-space: nowrap;
          }

          .header-nav-pill::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0;
            height: 2px;
            background: var(--color-gold);
            transition: width 0.3s ease;
          }

          .header-nav-pill:hover::after,
          .header-nav-pill-active::after {
            width: 100%;
          }

          .navbar-transparent .header-nav-pill-outline {
            color: var(--color-cream);
          }

          .navbar-transparent .header-nav-pill-active {
            color: var(--color-gold-light);
          }

          .navbar-solid .header-nav-pill-outline {
            color: var(--color-cream);
          }

          .navbar-solid .header-nav-pill-active {
            color: var(--color-gold-light);
          }

          .header-nav-pill-solid,
          .header-nav-pill-small {
            border-radius: 999px;
            padding: 0.55rem 1.25rem;
            background: linear-gradient(135deg, var(--color-gold), var(--color-primary-light));
            color: var(--color-ink) !important;
            font-weight: 600;
            box-shadow: var(--shadow-soft);
          }

          .header-nav-pill-solid::after {
            display: none;
          }

          .header-nav-pill-small {
            padding: 0.4rem 0.9rem;
            font-size: 0.85rem;
          }
        `}
      </style>
    </Navbar>
  );
};

export default Header;
