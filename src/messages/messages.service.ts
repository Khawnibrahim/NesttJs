import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { messages } from './message.schema';
import { InferModel, eq, asc } from 'drizzle-orm';
import { ReplyMessageDto } from '../developer/dto/reply-message.dto';
import { SendMessageDto } from '../client/dto/send-message.dto';

export type Message = InferModel<typeof messages>;
export type NewMessage = InferModel<typeof messages, 'insert'>;

@Injectable()
export class MessagesService {
  private db;

  constructor() {
    const sql = postgres(process.env.DATABASE_URL!, {
      ssl: { rejectUnauthorized: false },
    });
    this.db = drizzle(sql);
  }

  // CLIENT sends a message
  async sendClientMessage(dto: SendMessageDto, conversationId: string) {
    const newMsg: NewMessage = {
      conversationId,
      senderType: 'client',
      originalContent: dto.message,
      maskedContent: dto.message,
    };
    const result = await this.db.insert(messages).values(newMsg).returning();
    return result[0];
  }

  // DEVELOPER sends a reply
  async sendDeveloperReply(dto: ReplyMessageDto, conversationId: string) {
    const newMsg: NewMessage = {
      conversationId,
      senderType: 'developer',
      originalContent: dto.message,
      maskedContent: dto.message,
    };
    const result = await this.db.insert(messages).values(newMsg).returning();
    return result[0];
  }

  // GET all messages for a conversation
  async getMessages(conversationId: string) {
    return await this.db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));
  }
  // Developer sees conversations with AI summaries + client alias
async getDeveloperView() {
  const allMessages = await this.db
    .select()
    .from(messages)
    .orderBy(asc(messages.createdAt));

  // simple alias and summary logic
  return allMessages.map(m => ({
    conversationId: m.conversationId,
    clientAlias: 'Client_' + m.conversationId.slice(0, 5),
    messageSummary: (m.originalContent ?? '').slice(0, 20) + '...',
  }));
}


}
