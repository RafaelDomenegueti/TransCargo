import { errorCatcher } from './middlewares/error-catcher';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import 'express-async-errors';
import morgan from 'morgan';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorCatcher);

export default app;