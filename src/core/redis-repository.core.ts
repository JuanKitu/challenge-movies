/*
import { client } from '../database/redis.db';

export async function setValueCache(name: string, value: JSON | string | number) {
  if (typeof value === 'object') {
    await client.set(name, JSON.stringify(value));
  }
  if (typeof value === 'string') {
    await client.set(name, value);
  }
  if (typeof value === 'number') {
    await client.set(name, String(value));
  }
}

export async function getValueCache(name: string) {
  const value = await client.get(name);
  if (!value) {
    return '';
  }
  return value;
}
*/
