import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiInterceptor } from './api.interceptor';
import { AuthService } from '../service/auth.service';
import { UserSession } from '../model/user-session.model';

// Stub version of AuthService that always returns a session
class AuthServiceStub {
  getSession(): UserSession {
    return {
      id: 'abc123',
      name: 'liveviewer',
      userId: '241',
      href: '',
      role: 'Live Viewer',
      scope: {},
      type: 'user',
      expiresIn: 1234,
      owner: {},
    };
  }
}

describe('ApiInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true,
        },
        { provide: AuthService, useClass: AuthServiceStub }, // Inject stub
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should skip Authorization header for login request', () => {
    http.get('/service/sessions/user').subscribe();

    const req = httpMock.expectOne('/service/sessions/user');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should add Authorization header for other requests if session exists', () => {
    http.get('/service/cameras').subscribe();

    const req = httpMock.expectOne('/service/cameras');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
    req.flush({});
  });
});
