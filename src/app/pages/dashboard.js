// src/pages/dashboard.js
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async (user) => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRole(docSnap.data().role);
      } else {
        console.log('No such document!');
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserRole(user);
      }
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {role === 'student' && <p>Welcome, Student!</p>}
      {role === 'teacher' && <p>Welcome, Teacher!</p>}
      {role === 'admin' && <p>Welcome, Admin!</p>}
    </div>
  );
};

export default Dashboard;
