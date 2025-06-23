import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './services/database.service';
import { bookRouter } from './routes';

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

async function startServer() {
  await connectToDatabase();
  app.use('/books', bookRouter);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

if (require.main === module) {
  startServer();
}
