import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { conversations } from '../conversations/conversation.schema';

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),

  conversationId: uuid('conversation_id')
    .references(() => conversations.id)
    .notNull(),

  senderType: text('sender_type').notNull(), // 'client' | 'developer' | 'company'

  originalContent: text('original_content'),
  maskedContent: text('masked_content'),

  createdAt: timestamp('created_at').defaultNow(),
});
