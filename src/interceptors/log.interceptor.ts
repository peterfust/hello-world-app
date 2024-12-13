import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private static asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = request.headers['requestid'];
    const store = new Map<string, any>();
    store.set('requestId', requestId);

    return LogInterceptor.asyncLocalStorage.run(store, () => {
      return next.handle().pipe(
        tap(() => {
          // Additional logging logic if needed
        }),
      );
    });
  }

  static getRequestId(): string | undefined {
    const store = LogInterceptor.asyncLocalStorage.getStore();
    return store ? store.get('requestId') : undefined;
  }
}
