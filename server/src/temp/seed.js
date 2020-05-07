require('dotenv').config();

import { ObjectId } from 'mongodb';

import { connectDataBase } from '../database';

(async () => {
    try {
        console.log('[seed] running...');

        const db = await connectDataBase();
        const places = [
            {
                _id: new ObjectId(),
                title: 'Kyiv',
            },
            {
                _id: new ObjectId(),
                title: 'Lviv',
            },
            {
                _id: new ObjectId(),
                title: 'Toronto',
            },
        ];

        places.forEach(async (place) => await db.data.insertOne(place));
        console.log('[seed] success!');
    } catch {
        throw new Error('failed to seed database');
    }
})();
