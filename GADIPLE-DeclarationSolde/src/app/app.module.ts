import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { DeclarationService } from './service/declaration.service';
// import { AdminService } from './service/admin.service';
import { AdminService } from './service/admin.service';
import { AuthAdminService } from './service/authAdmin.service';
import { AuthAdminGuard } from './service/authAdmin-guard.service';

import { AppComponent } from './app.component';
import { DeclarationSoldeComponent } from './declaration-solde/declaration-solde.component';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { MainComponent } from './main/main.component';
import { SoldeMoisComponent } from './solde-mois/solde-mois.component';
import { UserListComponent } from './user-list/user-list.component';
import { OneUserComponent } from './one-user/one-user.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UserComponent } from './user/user.component';
import { ModalDeleteUserComponent } from './modal-delete-user/modal-delete-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'acceuil', component: MainComponent },
  { path: 'declaration', component: DeclarationSoldeComponent },
  { path: 'admin', component: AdminSpaceComponent },
  { path: 'admin/allusers', canActivate: [AuthAdminGuard], component: UserListComponent },
  { path: 'admin/user/:id', canActivate: [AuthAdminGuard], component: UserComponent },
  { path: 'admin/changepassword', canActivate: [AuthAdminGuard], component: ChangePasswordComponent },
  // { path: 'test', component: ModalDeleteUserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DeclarationSoldeComponent,
    AdminSpaceComponent,
    MainComponent,
    SoldeMoisComponent,
    UserListComponent,
    OneUserComponent,
    SpinnerComponent,
    UserComponent,
    ModalDeleteUserComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DeclarationService, AuthAdminService, AuthAdminGuard, AdminService],
  bootstrap: [AppComponent],
})
export class AppModule {}
