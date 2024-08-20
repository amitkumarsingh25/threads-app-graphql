import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphqlServer from './graphql/index';
import UserService from './services/user';

async function init() {
  const app = express();
  const PORT = process.env.port || 8000;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running!' });
  });

  app.use(
    '/graphql',
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => { 
        const token = req.headers.token;
        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`🚀 Server is running at PORT:${PORT}`));
}

init();
