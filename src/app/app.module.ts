import { NgModule, isDevMode } from '@angular/core';
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
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { MaterialModule } from './modules/material/material.module';
import { AuthModule } from './modules/auth/auth.module';
import { LandingPageComponent } from "./components/home/landing-page/landing-page.component";
import { DashboardComponent } from "./components/home/dashboard/dashboard.component";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PreviewApplicationsComponent } from './components/home/dashboard/preview-applications/preview-applications.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { TagsInputComponent } from './modules/shared/components/tags-input/tags-input.component';
import { SharedModule } from './modules/shared/shared.module';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { AdsenseModule } from 'ng2-adsense';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PreviewListingsComponent } from './components/home/dashboard/preview-listings/preview-listings.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardComponent,
        HomeComponent,
        LandingPageComponent,
        PreviewApplicationsComponent,
        FooterComponent,
        PrivacyComponent,
        TermsComponent,
        UpgradeComponent,
        ProductsComponent,
        AboutComponent,
        ContactComponent,
        PreviewListingsComponent,
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
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,

        SharedModule,
          ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
          })
    ],
    exports: [
      TagsInputComponent
    ]
})
export class AppModule { }
