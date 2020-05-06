require('dotenv').config();

import { MongoClient } from 'mongodb';

const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;

export const connectDataBase = async () => {
    const client = await MongoClient.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    const db = client.db('main');
    return {
        data: db.collection('data'),
        users: db.collection('users'),
    };
};
