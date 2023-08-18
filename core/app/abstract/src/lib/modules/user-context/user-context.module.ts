import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DefaultUserContextService, UserContextService } from "./services";

@NgModule({
	declarations: [],
	imports: [CommonModule],
	providers: [{ provide: UserContextService, useClass: DefaultUserContextService }]
})
export class UserContextModule {}
