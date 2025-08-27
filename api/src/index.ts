import express from 'express';
import cors from 'cors';
import { productsRouter } from './products.router';

const app = express();
app.use(cors(({
    origin: 'http://localhost:3000',
})))

app.use(express.json());

app.use('/api/products', productsRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







