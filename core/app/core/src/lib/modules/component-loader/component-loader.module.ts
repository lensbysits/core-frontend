import { NgModule } from "@angular/core";
import { ComponentLoaderDirective } from "./component-loader.directive";

@NgModule({
    declarations: [
        ComponentLoaderDirective
    ],
    exports: [
        ComponentLoaderDirective
    ]
})
export class ComponentLoaderModule { }