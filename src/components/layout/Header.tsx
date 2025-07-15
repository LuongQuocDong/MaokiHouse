import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../config/firebase';

const Header = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <header 
      style={{ 
        backgroundColor: '#824a39',
        padding: '1rem 2rem',
        marginBottom: '2rem'
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Link 
          to="/"
          className="text-decoration-none"
          style={{ 
            color: '#fdf2e9',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            transition: 'opacity 0.3s ease'
          }}
          onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '1'}
        >
          <img 
            src="https://res.cloudinary.com/dlkejgkqk/image/upload/v1752607273/logo_gkzxvs.png" 
            alt="Maoki House" 
            style={{ width: '150px' }} 
          />
        </Link>

        <nav className="d-flex gap-4 align-items-center">
          <Link 
            to="/about"
            className="text-decoration-none"
            style={{ 
              color: '#fdf2e9',
              fontSize: '1.1rem',
              transition: 'opacity 0.3s ease'
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '1'}
          >
            About Us
          </Link>
          <Link 
            to="/contact"
            className="text-decoration-none"
            style={{ 
              color: '#fdf2e9',
              fontSize: '1.1rem',
              transition: 'opacity 0.3s ease'
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '1'}
          >
            Contact Us
          </Link>
          {user && (
            <>
              <Link 
                to="/admin/dashboard"
                className="text-decoration-none"
                style={{ 
                  color: '#fdf2e9',
                  fontSize: '1.1rem',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '0.8'}
                onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '1'}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light"
                style={{ 
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem'
                }}
                onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = '#fdf2e9';
                  e.currentTarget.style.color = '#824a39';
                }}
                onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fdf2e9';
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 