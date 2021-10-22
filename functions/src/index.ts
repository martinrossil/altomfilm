import * as functions from "firebase-functions";
import { typeDefs } from './schema/Schema';
import { resolvers } from './resolvers/Resolvers';
import { ApolloServer } from 'apollo-server-express';
const express = require("express");

const app = express();

//Create graphql server
const server = new ApolloServer({ typeDefs, resolvers});

startServer();

export const api = functions.https.onRequest(app);

async function startServer(): Promise<void> {
   await server.start();
   server.applyMiddleware({ app, path: "/", cors: true });
}
