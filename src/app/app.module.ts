import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert/alert.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { SessionService } from './services/storage/session.service';
import { AuthComponent } from './pages/auth/auth.component';
import { ProductService } from './services/product/product.service';
import { LayoutComponent } from './pages/admin/layout/layout.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    DashboardComponent,
    AdminDashboardComponent,
    AdminProductComponent,
    AuthComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule,

  ],
  providers: [
    AuthService,
    ApiService,
    AlertService,
    SessionService,
    ProductService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
