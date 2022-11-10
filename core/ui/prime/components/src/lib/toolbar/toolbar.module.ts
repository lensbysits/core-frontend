import { NgModule } from "@angular/core";
import { ToolbarModule as PrimeToolbarModule } from "primeng/toolbar";
import { ToolbarComponent } from "./toolbar.component";

@NgModule({
    imports: [
        PrimeToolbarModule
    ],
    declarations: [
        ToolbarComponent
    ],
    exports: [
        ToolbarComponent
    ]
})
export class ToolbarModule { }