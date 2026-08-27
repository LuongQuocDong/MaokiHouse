import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  // The Dashboard has its own persistent sidebar/topbar shell — animating
  // the whole page (including the sidebar) on every nested navigation
  // looked broken. Skip the page-level transition there; DashboardLayout
  // fades just its own content area instead.
  if (location.pathname.startsWith('/admin/dashboard')) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ 
          opacity: 0,
          y: 20
        }}
        animate={{ 
          opacity: 1,
          y: 0
        }}
        exit={{ 
          opacity: 0,
          y: -20
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition; 