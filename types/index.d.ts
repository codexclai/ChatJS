export interface ServerSentEvent {
  readonly type: string;
  readonly data: string;
  readonly lastEventId: string;
  readonly retry?: number;
}

export interface ServerSentEventOptions {
  signal?: AbortSignal;
  maxLineLength?: number;
  maxEventBytes?: number;
}

export class ServerSentEventError extends Error {
  readonly code: string;
}

export function parseServerSentEvents(
  source: AsyncIterable<Uint8Array>,
  options?: ServerSentEventOptions
): AsyncGenerator<ServerSentEvent, void, unknown>;

export interface ChatJSOptions {
  [key: string]: unknown;
}

export interface ChatJSStatus {
  readonly state: 'initialized' | 'closed';
  readonly implementationStatus: 'foundation-only';
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

declare const ChatJS: {
  readonly Client: typeof ChatJSClient;
  readonly Error: typeof ChatJSError;
  readonly create: typeof createChatJS;
  readonly ChatJSClient: typeof ChatJSClient;
  readonly ChatJSError: typeof ChatJSError;
  readonly createChatJS: typeof createChatJS;
  readonly ServerSentEventError: typeof ServerSentEventError;
  readonly parseServerSentEvents: typeof parseServerSentEvents;
};

export { ChatJS };
export default ChatJS;
