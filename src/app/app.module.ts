import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotificationsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
