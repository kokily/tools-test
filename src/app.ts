import { ApolloServer } from 'apollo-server-koa';
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import schema from './schema';

const app = new Koa();
const router = new Router();

const apollo = new ApolloServer({
  schema,
  context: ({ ctx }: { ctx: Context }) => ({ ctx }),
});

router.post('/graphql', apollo.getMiddleware());
router.get('/graphql', apollo.getMiddleware());

apollo.applyMiddleware({ app, cors: false });

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
