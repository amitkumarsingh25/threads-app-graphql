import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
  const app = express();
  const PORT = process.env.port || 8000;

  app.use(express.json());

  // create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
        }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey there I am a graphql server!`,
      },
    },
  });

  // start the graphql server
  await gqlServer.start();

  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running!' });
  });

  app.use('/graphql', expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`🚀 Server is running at PORT:${PORT}`));
}

init();
