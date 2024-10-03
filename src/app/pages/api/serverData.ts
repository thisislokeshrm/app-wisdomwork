// src/pages/api/serverData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Replace with your credentials
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Use Firebase Admin SDK here for privileged operations
    const user = await admin.auth().getUser(req.query.uid as string);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user data' });
  }
};
