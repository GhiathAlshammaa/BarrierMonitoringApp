import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: SettingsComponent },
];
