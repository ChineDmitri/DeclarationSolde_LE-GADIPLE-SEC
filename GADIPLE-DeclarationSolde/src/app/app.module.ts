import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DeclarationService } from './service/declaration.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeclarationSoldeComponent } from './declaration-solde/declaration-solde.component';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { MainComponent } from './main/main.component';
import { SoldeMoisComponent } from './solde-mois/solde-mois.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'acceuil', component: MainComponent },
  { path: 'declaration', component: DeclarationSoldeComponent },
  { path: 'admin', component: AdminSpaceComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DeclarationSoldeComponent,
    AdminSpaceComponent,
    MainComponent,
    SoldeMoisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DeclarationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
