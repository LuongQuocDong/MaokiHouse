import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from 'react-bootstrap';
import { auth } from '../../config/firebase';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      setIsAdmin(null);
      return;
    }

    let cancelled = false;
    user
      .getIdTokenResult()
      .then((result) => {
        if (!cancelled) setIsAdmin(result.claims.admin === true);
      })
      .catch((err) => {
        console.error('Failed to verify admin claim:', err);
        if (!cancelled) setIsAdmin(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading || (user && isAdmin === null)) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" style={{ color: '#824a39' }} />
      </div>
    );
  }

  if (error) {
    console.error('Authentication error:', error);
    return <Navigate to="/admin" replace />;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
