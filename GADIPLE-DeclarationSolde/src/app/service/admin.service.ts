// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Subject } from 'rxjs';

// import { Admin } from '../models/Admin.model';
// import { User } from '../models/User.model';

// @Injectable()
// export class AdminService {
//   userSubject = new Subject<any[]>();

//   constructor(private httpClient: HttpClient, private router: Router) {}

//   admin: Admin = {
//     password: '',
//     isAuth: false,
//   };

//   users: any[] = [
//     {
//       MonthSolde: [],
//       dateDeclaration: '',
//       dateFDC_str: '',
//       dateFDC_utc: '',
//       nom: '',
//       start: true,
//     },
//   ];
//   user: User;

//   emitUsers() {
//     this.userSubject.next(this.users.slice());
//   }

//   // auth() {
//   //   this.httpClient
//   //     .get(`http://localhost:3000/api/admin/all`, {
//   //       withCredentials: true,
//   //     })
//   //     .subscribe(
//   //       (res: any) => {
//   //         this.admin.isAuth = res.isAuth;

//   //         this.users = res.users;

//   //         this.onRedirect();
//   //       },
//   //       (err: any) => {
//   //         console.log(err);

//   //         this.admin.isAuth = err.isAuth;

//   //         this.onRedirect();
//   //       }
//   //     );

//   //   this.emitUsers();
//   // }

//   getAllUsers(): any {
//     this.httpClient.get('http://localhost:3000/api/admin/all', { withCredentials: true }).subscribe(
//       (res: any) => {
//         this.users = res.users;

//         this.admin.isAuth = res.isAuth;

//         // this.onRedirect();
//         this.emitUsers();

//         // this.onRedirect();
//       },
//       (err: any) => {
//         this.admin.isAuth = err.isAuth;

//         // this.onRedirect();
//       },
//     );
//   }

//   getOneUser() {
//     this.httpClient
//       .get('http://localhost:3000/api/admin/61dc9525d7ea582219135753', {
//         withCredentials: true,
//       })
//       .subscribe(
//         (res: any) => {
//           this.user = res.user;

//           this.admin.isAuth = res.isAuth;
//         },
//         (err: any) => {
//           this.admin.isAuth = err.isAuth;
//         },
//       );
//   }

//   testAuth(): void {
//     if (!this.admin.isAuth) {
//       this.getAllUsers();
//       this.onRedirect();
//     }
//     console.log(this.admin);
//   }

//   logIn(password: string) {
//     this.admin.password = password;

//     this.httpClient
//       .post<Admin>('http://localhost:3000/api/admin/login', this.admin, { withCredentials: true })
//       .subscribe(
//         (res: any) => {
//           console.log('get login user', res);

//           this.admin.password = '';

//           this.admin.isAuth = res.isAuth;

//           this.onRedirect();
//         },
//         (err: any) => {
//           console.log(err);

//           this.admin.isAuth = err.isAuth;
//         },
//       );
//   }

//   onRedirect(): void {
//     if (this.admin.isAuth) {
//       this.router.navigate(['/admin/allusers']);
//     } else {
//       this.router.navigate(['/admin']);
//     }
//   }
// }
