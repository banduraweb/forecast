require('dotenv').config();

import { connectDataBase } from '../database';

(async () => {
    try {
        console.log('[clear] running...');
        const db = await connectDataBase();

        const data = await db.data
            .find({})
            .toArray();
        const users = await db.users
            .find({})
            .toArray();

        data.length > 0 && (await db.data.drop());
        users.length > 0 &&
            (await db.users.drop());

        console.log('[clear] success!');
    } catch {
        throw new Error(
            'failed to clear database',
        );
    }
})();
