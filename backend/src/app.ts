import express from 'express';
import cors from 'cors';
import { bookRouter } from './routes';

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());
app.use('/books', bookRouter);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
}

export { app };