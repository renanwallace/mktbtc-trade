import { Request, Response } from 'express';

async function Home(req: Request, res: Response) {
  res.status(200).json({ message: 'server is running' });
};

export default Home;
