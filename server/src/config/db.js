import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

// Return DATE columns as plain 'YYYY-MM-DD' strings. By default pg turns them into
// JS Date objects, which reach the client as full UTC timestamps. That caused
// "Invalid Date" in the UI, could shift dates by a day, and stopped recurring
// transactions from processing (that code compares and splits date strings).
const DATE_OID = 1082;
pg.types.setTypeParser(DATE_OID, (value) => value);

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

export async function query(text, params) {
  return pool.query(text, params);
}

export async function checkConnection() {
  const result = await query('SELECT 1 AS ok');
  return result.rows[0]?.ok === 1;
}
