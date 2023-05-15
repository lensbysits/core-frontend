import { Component, Input } from "@angular/core";

@Component({
	selector: "lens-avatar",
	templateUrl: "avatar.component.html"
})
export class LensAvatarComponent {
	@Input()
	public label = "test";

	@Input()
	public styleClass = "";

	@Input()
	public style?:object;
}
