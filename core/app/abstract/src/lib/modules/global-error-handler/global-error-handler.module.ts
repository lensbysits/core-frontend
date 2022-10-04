import { ErrorHandler, ModuleWithProviders, NgModule, Type } from "@angular/core";
import { ErrorDialogModule } from "../error-dialog";
import { GlobalErrorHandler } from "./global-error-handler.class";

@NgModule({
    imports: [
        ErrorDialogModule
    ],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ]
})
export class GlobalErrorHandlerModule {
    public static forRoot(globalErrorHandlerClass: Type<any>): ModuleWithProviders<GlobalErrorHandlerModule> {
        return {
            ngModule: GlobalErrorHandlerModule,
            providers: [
                { provide: ErrorHandler, useClass: globalErrorHandlerClass }
            ]
        }        
    }
}