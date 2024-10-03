import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // New state for error messages
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user role from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.role === 'student') {
          router.push('/student-dashboard');
        } else if (userData.role === 'teacher') {
          router.push('/teacher-dashboard');
        } else if (userData.role === 'admin') {
          router.push('/admin-dashboard');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please check your credentials and try again.'); // Set error message
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get user role from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.role === 'student') {
          router.push('/student-dashboard');
        } else if (userData.role === 'teacher') {
          router.push('/teacher-dashboard');
        } else if (userData.role === 'admin') {
          router.push('/admin-dashboard');
        }
      }
    } catch (error) {
      console.error('Error with Google login:', error);
      setError('Failed to log in with Google. Please try again.'); // Set error message
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          flex: 1,
          backgroundImage: 'url(/assets/images/loginpageimage.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
          <h2>Welcome to Wisdomwork!</h2>
          <p>Sign in to access your account.</p>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>} {/* Error message */}
          <input
            type="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <a href="/forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              margin: '20px 0',
              backgroundColor: '#f5b726',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>or</div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src="/assets/images/google-icon.png"
              alt="Google Icon"
              style={{ width: '20px', marginRight: '10px' }}
            />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;