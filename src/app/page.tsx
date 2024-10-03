// src/app/page.tsx

"use client"; // Mark this component as a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig'; // Ensure this path is correct

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect to the student-dashboard if user is authenticated
        router.push('/student-dashboard');
      } else {
        // If user is not authenticated, redirect to login page
        router.push('./pages/Login'); // Changed Login to '/login'
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  return null; // No need to render anything if redirection is handled
};

export default HomePage;
