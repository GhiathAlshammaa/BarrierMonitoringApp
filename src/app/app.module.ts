import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { routes } from './app.routes';
import { environment } from '../environment/environment.prod';
import { BarrierDetailsComponent } from './barrier-details/barrier-details.component';


// Function to asynchronously load Google Maps API
export function initializeApp(): () => Promise<void> {
  return () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotificationsComponent,
    SettingsComponent,
    BarrierDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
