import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TableModule as PrimeTableModule } from "primeng/table";
import { LoadingSpinnerModule } from "../loading-indicator";
import { ColumnComponent } from "./column.component";
import { ColumnsComponent } from "./columns.component";
import { TableComponent } from "./table.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeTableModule
    ],
    declarations: [
        TableComponent,
        ColumnsComponent,
        ColumnComponent
    ],
    exports: [
        TableComponent,
        ColumnsComponent,
        ColumnComponent
    ]
})
export class TableModule { }