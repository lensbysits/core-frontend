# framework-core-security-msal

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test framework-core-security-msal` to execute the unit tests.

## Configuration

1. Add the necessary import to your app module:

    ```ts
    import { MsalAuthenticationModule } from '@lens/security-msal';

    imports: [
        ...
        MsalAuthenticationModule.forRoot({
            clientId: "CLIENT ID OBTAINED FROM AZURE PORTAL",
            authority: "AUTHORITY OBTAINED FROM AZURE PORTAL",
            redirectUri: "WHERE TO GO AFTER LOGGING IN",
            postLogoutRedirectUri: "WHERE TO GO AFTER LOGGING OUT"
        }, {
            scopes: [
                // Guard scopes
            ],
            loginFailedRoute: "WHERE TO GO WHEN AUTHENTICATION FAILS"
        }, {
            protectedResources: new Map<string, Array<string> | null>([
                [ "https://example.com/api/*", [ // Interceptor scopes ] ]
            ])
        }),
        ...
    ]
```

2. Add the necessary bootstrap components to your app module:

    ```ts
    bootstrap: [
        ...
        ...MsalAuthenticationModule.bootstrap
        ...
    ]
    ```

3. Add the redirect component to `index.html`:

    ```html
        <lens-authentication-redirect></lens-authentication-redirect>
    ```