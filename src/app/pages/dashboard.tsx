// src/pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async (user: any) => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setRole(userData.role);
        // Redirect based on role
        if (userData.role === 'student') {
          router.push('/student-dashboard');
        } else if (userData.role === 'teacher') {
          router.push('/teacher-dashboard');
        } else if (userData.role === 'admin') {
          router.push('/admin-dashboard');
        }
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserRole(user);
      } else {
        router.push('/login'); // If not logged in, redirect to login
      }
    });
  }, [router]);

  return <div>Loading...</div>;
};

export default Dashboard;
