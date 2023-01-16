import { NgModule } from "@angular/core";
import { PanelModule as PrimePanelModule } from "primeng/panel";
import { PanelComponent } from "./panel.component";

@NgModule({
    imports: [
        PrimePanelModule
    ],
    declarations: [
        PanelComponent
    ],
    exports: [
        PanelComponent
    ]
})
export class PanelModule { }