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
            "@lens/app-abstract": [
                "libs/framework/core/app/abstract/src/index.ts"
            ],      
            "@lens/security-abstract": [
                "libs/framework/core/security/abstract/src/index.ts"
            ],
            "@lens/security-msal": [
                "libs/framework/core/security/msal/src/index.ts"
            ],
            "@lens/security-oauth": [
                "libs/framework/core/security/oauth/src/index.ts"
            ],
            "@lens/ui-nebular-components": [
                "libs/framework/core/ui/nebular/components/src/index.ts"
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
            "framework-core-app-abstract": "libs/framework/core/app/abstract",
            "framework-core-security-abstract": "libs/framework/core/security/abstract",
            "framework-core-security-msal": "libs/framework/core/security/msal",
            "framework-core-security-oauth": "libs/framework/core/security/oauth",
            "framework-core-ui-nebular-components": "libs/framework/core/ui/nebular/components",
            "framework-core-ui-nebular-layout": "libs/framework/core/ui/nebular/layout",
            "framework-core-ui-prime-components": "libs/framework/core/ui/prime/components",
            "framework-core-ui-prime-layout": "libs/framework/core/ui/prime/layout",
            ...
        }
    ```
    
    
## Configure multi language for your app and the used components
### Usage
#### Inititalization
In the module of your app add `MultilingualModule.forRoot()`. This will inject the Language and Translation service and uses the resource file you've plaved under my-app/src/assets/i18n/<ISO 639-1 Code>.json

Configure the multilingual menu for eager loaded modules by adding a provider for the APP_INITIALIZER in your module
```typescript
{
    provide: APP_INITIALIZER,
    useFactory: (languageService: LanguageService, menuService: MenuService) => () => {
        languageService.onTranslationsLoaded(() => {
            menuService.addMenuItems(menu);
        })
        languageService.initLanguageConfiguration()
    },
    deps: [LanguageService, MenuService],
    multi: true
}
```

Configure lazy loaded modules in the constructor of the module

```typescript
export class MasterdataModule {
    constructor(languageService: LanguageService) {
        languageService.onTranslationsLoaded(() => {
            menuService.addMenuItems(menu);
            })
        languageService.initLanguageConfiguration()
    }
}
```

#### Configuration
Update the configuration.json and add the following

```json
    "languageConfiguration":{
        "fallbackLanguage":"<The ISO 639-1 code of the language when the requested language is not available>",
        "supportedLanguages":["en","nl"] //Contains all supported languages in your app. Each ISO code in the list needs to have a resource file in the assets/i18n folder
    }
```

# Create you own resource files
Create the JSON files for your app in `<my app>/src/assets/i18n'.
Create a file per supported language. Currently the modules support EN and NL

### Copy the i18n assets for the used modules
Update you project .json to copy the files from /src/assets/i18n to the dist folder
  ```json
    {
        "glob": "**/*",
        "input": "libs/<the lib I wanted to copy the i18n files from>/assets/i18n",
        "output": "assets/i18n/<module-name>" < the foldername must match the configured value in the MultilingualModule.forChild(<name>) method of the corresponding module
    },
```
            
**Example**
```typescript
    MultilingualModule.forChild("prime"),
    MultilingualModule.forChild("user-management")
```


```json
    {
        "glob": "**/*",
        "input": "libs/framework/core/ui/prime/layout/src/assets/i18n",
        "output": "assets/i18n/prime"
    },
    {
        "glob": "**/*",
        "input": "libs/user-management/domain/src/assets/i18n",
        "output": "assets/i18n/user-management"
    }
```

Run `nx build <my project>` and check whether the dist folder contains an `assets\i18n` folder containing all translation files per module (a folder per module). If there are files missing, you probably made mistakes in the configuration of the assets section in the project.json
Your structure with the above configuration should look like the following:
- assets
  - i18n
    - en.json
    - nl.json
    - prime
      - en.json
      - nl.json
    - user-management
      - en.json
      - nl.json
  

## Create your own translation file
Please keep the format of the JSON in line with the one that's created for the user management module

## Use the languages in your code
### Html
```html
<h1>{{"usermgmt.pages.editGroup.header" | translate}}</h1>

<my-input-component
    [label]="'usermgmt.pages.editGroup.myComponent.label' | translate" >
</my-input-component>

<h1>{{"usermgmt.pages.editGroup.header" | translate}}</h1>

<p
    [translate]="'usermgmt.pages.editGroup.myComponent.label'"
    [translateParams]="{value1: paramValue1, value2: paramValue2 }">
</p>

<!--source: https://www.vitamindev.com/angular/how-to-use-parameters-in-ngx-translate/ -->

```

### Typescript

```typescript
constructor(private translateService: TranslateService){}

public myMethod(): void {
    const translation = this.translateService.instant("<my key>")
    const translationWithParams = this.translateService.instant("<my key with params>", { "paramName": paramValue })
    // to use params in your translation, use {{paramName}} in your translated tekst. E.g. "{{memberCount}} members are updated"
}
```
