import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TableModule as PrimeTableModule } from "primeng/table";
import { TieredMenuModule } from "primeng/tieredmenu";
import { ButtonModule } from "../button";
import { ColumnComponent } from "./column.component";
import { ColumnsComponent } from "./columns.component";
import { RowActionComponent } from "./row-action.component";
import { RowActionsComponent } from "./row-actions.component";
import { TableComponent } from "./table.component";

@NgModule({
	imports: [CommonModule, PrimeTableModule, ButtonModule, TieredMenuModule],
	declarations: [TableComponent, ColumnsComponent, ColumnComponent, RowActionsComponent, RowActionComponent],
	exports: [TableComponent, ColumnsComponent, ColumnComponent, RowActionsComponent, RowActionComponent]
})
export class TableModule {}
