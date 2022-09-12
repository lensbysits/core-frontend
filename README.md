# frontend-core

## Configuring your workspace

The Lens frontend framework is incorporated into your workspace as follows:

1. Adding the Lens framework as a submodule in the Nx workspace structure:

    ```
        cd libs
        git submodule add https://github.com/lensbysits/core-frontend.git
    ```

    If you would like to contribute to the Lens framework, execute the following commands:

    ```
        cd libs/framework
        git checkout develop
    ```

2. Adding the Lens framework subdependencies to `package.json`:

    ```json
        "dependencies": {
            ...

            // IMPORTANT: versions were applicable at the time of writing, please check current Lens framework dependency versions upon configuring your workspace.

            "@azure/msal-angular": "2.4.1",
            "@azure/msal-browser": "2.28.2",
            "angular-auth-oidc-client": "14.1.4",

            "@nebular/eva-icons": "9.0.3",
            "@nebular/theme": "9.0.3",
            "eva-icons": "1.1.3",
    
            "primeicons": "5.0.0",
            "primeng": "14.0.2",
            "primeflex": "3.2.1",
            ...
        }
    ```

    Then, to store the configured packages in your local npm repository, please run `npm install`.
    Unfortunately the `@nebular/theme` package is not yet updated to support `@angular/animations@14` and higher.
    If you run into problems with this, you could force the packages to be downloaded by - I regret to say this - executing `npm install --force`.

3. Configure the `import` shorthands for the Lens framework in `tsconfig.base.json`:

    ```json
        "paths": {
            ...
            "@lens/security-abstract": [
                "libs/framework/core/security/abstract/src/index.ts"
            ],
            "@lens/security-msal": ["libs/framework/core/security/msal/src/index.ts"],
            "@lens/security-oauth": [
                "libs/framework/core/security/oauth/src/index.ts"
            ],
            "@lens/ui-nebular-layout": [
                "libs/framework/core/ui/nebular/layout/src/index.ts"
            ],
            "@lens/ui-prime-components": [
                "libs/framework/core/ui/prime/components/src/index.ts"
            ],
            "@lens/ui-prime-layout": [
                "libs/framework/core/ui/prime/layout/src/index.ts"
            ],
            ...
        }
    ```

4. Configure the projects so that Angular and Nx are aware of them in `angular.json`:

    ```json
        "projects": {
            ...
            "framework-core-security-abstract": "libs/framework/core/security/abstract",
            "framework-core-security-msal": "libs/framework/core/security/msal",
            "framework-core-security-oauth": "libs/framework/core/security/oauth",
            "framework-core-ui-nebular-layout": "libs/framework/core/ui/nebular/layout",
            "framework-core-ui-prime-components": "libs/framework/core/ui/prime/components",
            "framework-core-ui-prime-layout": "libs/framework/core/ui/prime/layout",
            ...
        }
    ```