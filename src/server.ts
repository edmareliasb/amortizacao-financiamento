
import express, { NextFunction, Request, Response } from 'express';
import router from './infra/routes/router';

const app = express();

app.use(express.json());
app.use(router);

// Below route is trigerred when any error is is thrown
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
  res.status(500).json({message: err.message});
});

app.listen(3000, () => 'server running on port 3333');
