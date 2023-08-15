import { NgModule } from "@angular/core";
import { CardModule as PrimeCardModule } from "primeng/card";
import { CardComponent } from "./card.component";

@NgModule({
	imports: [PrimeCardModule],
	declarations: [CardComponent],
	exports: [CardComponent]
})
export class CardModule {}
