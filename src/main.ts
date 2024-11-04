// Ensure the 'browser' variable is defined globally
(window as any).browser = (window as any).browser || (window as any).chrome || window;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));