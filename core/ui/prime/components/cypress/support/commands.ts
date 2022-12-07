/// <reference types="cypress" />

import { mount } from 'cypress/angular'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable {
      mount: typeof mount
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Cypress.Commands.add('mount', (component: any, config) => mount(component, config));
