import { NgModule } from "@angular/core";
import { TemplateRendererComponent } from "../../components/template-renderer.component";
import { DefaultDialogService, DialogService } from "./dialog.service";

@NgModule({
	declarations: [TemplateRendererComponent],
	exports: [TemplateRendererComponent],
	providers: [{ provide: DialogService, useClass: DefaultDialogService }],
})
export class DialogModule {}
