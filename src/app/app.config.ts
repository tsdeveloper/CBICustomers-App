import { config } from './app.config.server';
import {  ApplicationConfig, importProvidersFrom, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule, provideSpinnerConfig } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { InitService } from './_services/init.service';

function initializeApp(initService: InitService) {
  return () => lastValueFrom(initService.init()).finally(() => {
    const splash = document.getElementById('initial-splash');
    if (splash) {
      splash.remove();
    }
  })
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule.forRoot()),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeApp,
    //   multi: true,
    //   deps: [InitService]
    // }
  ]
};


