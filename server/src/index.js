import { config } from 'dotenv';
import express from 'express';
import {
    ApolloServer,
    makeExecutableSchema,
} from 'apollo-server-express';
import cors from 'cors';
import { resolvers, typeDefs } from './graphql';
import { connectDataBase } from './database';
import cookieParser from 'cookie-parser';

config();
const app = express();
app.use(cookieParser(process.env.SECRET_KEY));
app.use(cors());
const port = process.env.PORT || 80;

(async (app) => {
    try {
        const db = await connectDataBase();
        console.log('db connected');
        const schema = makeExecutableSchema({
            typeDefs,
            resolvers,
        });
        const server = new ApolloServer({
            schema,
            context: ({ req, res }) => ({
                db,
                req,
                res,
            }),
        });
        server.applyMiddleware({
            app,
            path: '/api',
        });

        app.listen(port, () => {
            console.log(
                `Started..on.port.${port}`,
            );
        });
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
})(app);
