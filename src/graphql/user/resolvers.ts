import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from '../../services/user';

const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const user = await UserService.getUserByEmail(context.user.email);
      return user;
    }
    throw new Error('I dont know who are you');
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
