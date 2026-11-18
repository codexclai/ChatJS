export interface ChatJSOptions {
  [key: string]: unknown;
}

export interface ChatJSStatus {
  readonly state: 'initialized' | 'closed';
  readonly implementationStatus: 'foundation-only';
  readonly version: string;
}

export interface ChatJSErrorOptions {
  code?: string;
  cause?: unknown;
}

export class ChatJSError extends Error {
  readonly code: string;
  constructor(message: string, options?: ChatJSErrorOptions);
}

export class ChatJSClient {
  constructor(options?: ChatJSOptions);
  readonly options: Readonly<ChatJSOptions>;
  readonly closed: boolean;
  getStatus(): ChatJSStatus;
  assertOpen(): this;
  close(): void;
  on(event: string | symbol, listener: (...args: unknown[]) => void): this;
  once(event: string | symbol, listener: (...args: unknown[]) => void): this;
  off(event: string | symbol, listener: (...args: unknown[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
}

export function createChatJS(options?: ChatJSOptions): ChatJSClient;
export const version: string;

declare const ChatJS: {
  ChatJSClient: typeof ChatJSClient;
  ChatJSError: typeof ChatJSError;
  createChatJS: typeof createChatJS;
  version: typeof version;
};

export default ChatJS;
