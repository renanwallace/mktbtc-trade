import { Request, Response } from 'express';

async function Home(req: Request, res: Response) {
  res.status(200).send({ message: 'server is running' });
};

export default Home;
