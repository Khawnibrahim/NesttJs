import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const DbProvider: Provider = {
  provide: 'DB', // this is the token Nest will use for injection
  useFactory: () => {
    const sql = postgres(process.env.DATABASE_URL!, {
      ssl: { rejectUnauthorized: false },
    });
    return drizzle(sql);
  },
};
