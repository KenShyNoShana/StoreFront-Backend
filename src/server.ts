import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';

export const app: express.Application = express();
export const address: string = "0.0.0.0:3000";

app.use(express.json());

app.use(bodyParser.json());

ordersRouter(app);
productsRouter(app);
userRouter(app);