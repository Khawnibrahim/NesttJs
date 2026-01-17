import { Injectable } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

@Injectable()
export class DbService {
  public client;
  public orm;

  constructor() {
    this.client = postgres(process.env.DATABASE_URL!, { ssl: { rejectUnauthorized: false } });
    this.orm = drizzle(this.client);
  }
}

