import functions from 'firebase-functions';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import Schema from './Schema.js';

const app = express();

app.use('/', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

export const graphql = functions.https.onRequest(app);
