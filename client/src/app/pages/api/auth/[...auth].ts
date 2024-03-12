// pages/api/auth/[...auth].ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { query } = req;
    const { code } = query;

    if (!code || typeof code !== 'string') {
      res.status(400).json({ error: 'Authorization code not provided' });
      return;
    }

    try {
      const accessTokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', {
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code,
      });

      // Handle accessTokenResponse here, like storing the access token in session or database
      console.log(accessTokenResponse.data);

      res.redirect('/'); // Redirect user to a suitable page after successful authorization
    } catch (error) {
      console.error('Error exchanging code for access token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
