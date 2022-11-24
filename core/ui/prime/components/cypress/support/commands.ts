/// <reference types="cypress" />

import { mount } from 'cypress/angular'

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component: any, config) => mount(component, config));
