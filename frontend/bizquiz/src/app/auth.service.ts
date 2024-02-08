// // auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
//   private isLoggedInSubject = new BehaviorSubject<boolean>(false);
//   isLoggedIn$ = this.isLoggedInSubject.asObservable();
//   private initialCheckCompletedSubject = new Subject<void>();
//   initialCheckCompleted$ = this.initialCheckCompletedSubject.asObservable();

//   constructor(private cookieService: CookieService) {
//     this.checkAndSetLoggedIn();
//   }

//   private async checkAndSetLoggedIn(): Promise<void> {
//     const token = this.cookieService.get('jwt');
//     console.log('Received token from cookie:', token);

//     const isLoggedIn = !!token;
//     console.log('Checking and setting login state. Is logged in:', isLoggedIn);

//     this.setLoggedIn(isLoggedIn);

//     // Notify that the initial check is completed
//     this.initialCheckCompletedSubject.next();
//     this.initialCheckCompletedSubject.complete();
//   }

//   private updateAuthStateInStorage(isLoggedIn: boolean): void {
//     if (isLoggedIn) {
//       console.log('User is logged in.');
//     } else {
//       console.log('User is not logged in.');
//     }
//   }

//   setLoggedIn(value: boolean): void {
//     this.isLoggedInSubject.next(value);
//     this.updateAuthStateInStorage(value);
//   }

//   // Use this method to await the completion of the initial check
//   async awaitInitialCheckCompleted(): Promise<void> {
//     return new Promise<void>((resolve) => {
//       this.initialCheckCompleted$.subscribe({
//         next: () => resolve(),
//         complete: () => resolve(),
//       });
//     });
//   }

//   // Make checkAndSetLoggedIn public
//   async checkAndSetLoggedInPublic(): Promise<void> {
//     return this.checkAndSetLoggedIn();
//   }

//   // Observable for changes in login state
//   getLoginStateObservable(): Observable<boolean> {
//     return this.initialCheckCompleted$.pipe(
//       switchMap(() => this.isLoggedIn$),
//       take(1) // Only emit the current state and complete
//     );
//   }

            constructor() { }

        login(): Promise<any> {
            return new Promise((resolve) =>{
                localStorage.setItem('loggedIn', 'true');
                resolve(true);
            })
        }

        isLoggedIn(): boolean {
            return !!localStorage.getItem('loggedIn'); //if logged in this = true, sinon false
        }
}
