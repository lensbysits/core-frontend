import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguageExistsValidator } from "./language-exists-validator/language-exists.validator";

@NgModule({
	imports: [CommonModule],
	providers: [LanguageExistsValidator]
})
export class MasterdataFeaturesModule {}
