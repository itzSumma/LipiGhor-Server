import { env } from '../config/env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  }

  info(message: string): void {
    // eslint-disable-next-line no-console
    console.log(this.formatMessage('info', message));
  }

  warn(message: string): void {
    // eslint-disable-next-line no-console
    console.warn(this.formatMessage('warn', message));
  }

  error(message: string | Error): void {
    const msg = message instanceof Error ? `${message.message}\n${message.stack}` : message;
    // eslint-disable-next-line no-console
    console.error(this.formatMessage('error', msg));
  }

  debug(message: string): void {
    if (env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug(this.formatMessage('debug', message));
    }
  }
}

export const logger = new Logger();
