import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly loginEndpoint = '/service/sessions/user';

  constructor(private authService: AuthService) {}

  /**
   * Intercepts all outgoing HTTP requests.
   * - Skips auth header for login requests
   * - Appends Authorization header with session token for all other requests
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip auth header for the login request itself
    if (req.url.includes(this.loginEndpoint)) {
      return next.handle(req);
    }

    // Retrieve the current session (if available)
    const session = this.authService.getSession();

    // If no session is found, proceed without modifying the request
    if (!session) {
      return next.handle(req);
    }

    // Clone the request and add the Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.id}`,
      },
    });

    return next.handle(authReq);
  }
}
