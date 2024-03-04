import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthModule } from './app/modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerInterceptor } from './app/modules/core/interceptors/spinner.interceptor';
import { HeaderClassInterceptor } from './app/modules/core/interceptors/header.class.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      AuthModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      }),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderClassInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
