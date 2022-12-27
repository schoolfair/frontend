import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MaterialModule } from './modules/material/material.module';
import { AuthModule } from './modules/auth/auth.module';
import { LandingPageComponent } from "./components/home/landing-page/landing-page.component";
import { DashboardComponent } from "./components/home/dashboard/dashboard.component";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PreviewApplicationsComponent } from './components/home/dashboard/preview-applications/preview-applications.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardComponent,
        HomeComponent,
        LandingPageComponent,
        PreviewApplicationsComponent,
        FooterComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        AuthModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule
    ]
})
export class AppModule { }
