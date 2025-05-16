import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserSession } from '../model/user-session.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private sessionSubject = new BehaviorSubject<UserSession | null>(null);
  session$ = this.sessionSubject.asObservable();

  private loginUrl = 'https://orchid.ipconfigure.com/service/sessions/user';

  constructor(private http: HttpClient) {}

  /**
   * Authenticates the user by POSTing credentials to the session endpoint.
   * On success, stores the session in a BehaviorSubject.
   *
   * @returns Observable<UserSession> - emits the authenticated session object
   */
  login(): Observable<UserSession> {
    const credentials = { username: 'liveviewer', password: 'tpain' };
    return this.http
      .post<UserSession>(this.loginUrl, credentials)
      .pipe(tap((session) => this.sessionSubject.next(session)));
  }

  /**
   * Returns the current session value stored in the BehaviorSubject.
   *
   * @returns UserSession | null - the current session if logged in, or null
   */
  getSession(): UserSession | null {
    return this.sessionSubject.value;
  }
}
