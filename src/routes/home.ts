import { Request, Response } from 'express';

function Home(req: Request, res: Response) {
  res.send('OK');
};

export default Home;
