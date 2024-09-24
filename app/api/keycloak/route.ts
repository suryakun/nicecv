import { NextApiRequest, NextApiResponse } from 'next';

export const GET = (_req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ message: 'Hello from Keycloak API' });
};
