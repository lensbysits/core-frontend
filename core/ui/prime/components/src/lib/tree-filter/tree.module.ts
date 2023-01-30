import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TreeComponent } from "./tree.component";
import {TreeModule as PrimeTreeModule} from 'primeng/tree';

@NgModule({
    imports: [
        CommonModule,
        PrimeTreeModule,
        ReactiveFormsModule
    ],
    declarations: [
        TreeComponent
    ],
    exports: [
        TreeComponent
    ]
})
export class TreeModule { }