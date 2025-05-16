import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login and store the session', () => {
    const mockSession = {
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

    service.login().subscribe((session) => {
      expect(session).toEqual(mockSession);
      expect(service.getSession()).toEqual(mockSession);
    });

    const req = httpMock.expectOne(
      'https://orchid.ipconfigure.com/service/sessions/user'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockSession);
  });
});
