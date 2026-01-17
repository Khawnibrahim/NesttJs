import { Inject, Injectable } from '@nestjs/common';
import { InferModel } from 'drizzle-orm';
import { conversations } from './conversation.schema';

export type Conversation = InferModel<typeof conversations>;
export type NewConversation = InferModel<typeof conversations, 'insert'>;

@Injectable()
export class ConversationsService {
  constructor(@Inject('DB') private readonly db: any,) {} // <-- inject Drizzle connection

  // Example: create a conversation
  async createConversation(title: string) {
    const newConv: NewConversation = { title };
    const result = await this.db.insert(conversations).values(newConv).returning();
    return result[0];
  }

  // Example: get all conversations
  async getAllConversations() {
    return await this.db.select().from(conversations);
  }
}

