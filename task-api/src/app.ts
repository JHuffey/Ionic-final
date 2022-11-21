import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import taskRoutes from './routes/taskRoutes';
import mongoose from 'mongoose';

const connectionString: string = 'mongodb://localhost:27017/taskDB';

mongoose.connect(connectionString).then(
    () => console.log('database connection successful!'), 
    err => console.log('Error connecting to the database', err));

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
const corsOptions = {
    origin: [ 'http://localhost:4200', 'http://localhost:8102' ]
};
app.use(cors(corsOptions));

// routes
app.use('/tasks', taskRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});


app.listen(3000);