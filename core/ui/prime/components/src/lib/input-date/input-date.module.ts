import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar"
import { InputDateComponent } from "./input-date.component";

@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        ReactiveFormsModule
    ],
    declarations: [
        InputDateComponent
    ],
    exports: [
        InputDateComponent
    ]
})
export class InputDateModule { }