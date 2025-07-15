import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { auth } from '../../config/firebase';

const customButtonStyle = {
  backgroundColor: '#824a39',
  borderColor: '#824a39',
  color: '#fdf2e9',
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Attempting login with:', email);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      toast.success('Login successful');
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error.code, error.message);
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="mx-auto" style={{ maxWidth: '400px' }}>
        <Card className="shadow">
          <Card.Body>
            <h1 className="text-center mb-4" style={{ color: '#824a39' }}>Admin Login</h1>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#824a39' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ borderColor: '#824a39' }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ color: '#824a39' }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderColor: '#824a39' }}
                />
              </Form.Group>

              <Button
                type="submit"
                disabled={loading}
                className="w-100"
                style={customButtonStyle}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login; 