import { ApplicationConfig, inject, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
// import { provideExperimentalZoneless } from '@angular/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({
          uri: 'https://rickandmortyapi.com/graphql',
        }),
        cache: new InMemoryCache(),
      };
    }),
    // provideExperimentalZoneless()
    provideExperimentalZonelessChangeDetection()
  ],
 
};
