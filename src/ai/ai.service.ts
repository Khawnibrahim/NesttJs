import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  summarizeClientMessage(message: string): string {
    return `Client wants help regarding: ${message.slice(0, 30)}...`;
  }

  validateDeveloperReply(message: string): boolean {
    const banned = ['illegal', 'vulgar'];
    return !banned.some(word => message.includes(word));
  }
}
