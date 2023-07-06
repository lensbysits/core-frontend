import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BlockUIModule as PrimeBlockUIModule } from "primeng/blockui";
import { IconModule } from "../icon";
import { BlockableDivComponent } from "./blockable-div.component";
import { ContentComponent } from "./content.component";

@NgModule({
	imports: [CommonModule, IconModule, PrimeBlockUIModule],
	declarations: [BlockableDivComponent, ContentComponent],
	exports: [BlockableDivComponent]
})
export class BlockableDivModule {}
