import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar"
import { InputDateComponent } from "./input-date.component";

@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        FormsModule
    ],
    declarations: [
        InputDateComponent
    ],
    exports: [
        InputDateComponent
    ]
})
export class InputDateModule { }