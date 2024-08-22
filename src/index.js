import express from 'express';
import { prisma, getCacheKey } from '../prisma/db.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/cache', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            cache: true
        });

        res.json(users);
    } catch (error) {
        console.error(error)

        res.send('Cache with cache: true failed with error ' + error);
    }
});

app.get('/custom-cache', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            cache: { ttl: 60, key: getCacheKey([ { prisma: 'User' } ]) }
        });

        res.json(users);
    } catch (error) {
        console.error(error)

        res.send('Custom Cache failed with error ' + error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});