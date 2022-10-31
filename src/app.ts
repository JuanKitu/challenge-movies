import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { requestHandler } from './middleware/routingModule.middleware';
import { authentication } from './middleware/authentication.middleware';
import { rolesMiddleware } from './middleware/rolesModule.middleware';
import parserMiddleware from './middleware/parser.middleware';
import { pathToTreeFile } from './core/pathToTreeFile.core';

// import { stream } from './middlewares/winston';

dotenv.config({ path: path?.join?.(__dirname, '../config/.env') });
const app: express.Application = express();
try {
  app.use(urlencoded({ limit: '150mb', extended: true }));
  app.use(json({ limit: '150mb' }));
  app.set('port', process.env.PORT || 3000);
  app.use(morgan('dev'));
  app.use(json({ limit: '50mb' }));
  app.use(cors());
  app.use(express.static(path.resolve(__dirname, '../public')));
  const tree = pathToTreeFile('../modules');
  app.set('tree', tree);
  app.route('/api/*').all(parserMiddleware, authentication, rolesMiddleware, requestHandler);
} catch (error: any) {
  // ServerLog.error(`can't create path tree in ${error.message}`);
  process.exit();
}

export default app;
