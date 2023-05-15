import { NgModule } from "@angular/core";
import { LensAvatarComponent } from "./avatar.component";
import { AvatarModule } from "primeng/avatar";

@NgModule({
    imports: [
        AvatarModule
    ],
    declarations: [
        LensAvatarComponent
    ],
    exports: [
        LensAvatarComponent
    ]
})
export class LensAvatarMolule { }