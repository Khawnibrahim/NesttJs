import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const conversations = pgTable('conversations', {
  id: uuid('id').defaultRandom().primaryKey(),

  title: text('title').notNull(), // ✅ ADD THIS

  createdAt: timestamp('created_at').defaultNow(),
});
