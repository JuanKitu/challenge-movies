import { Client } from 'redis-om';
import { createClient } from 'redis';

const url = 'redis://localhost:6379';

export const connection = createClient({ url });
connection.connect().then();

const redisOM = new Client().use(connection);
const client = redisOM.then();
export default client.then();
