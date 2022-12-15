import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { DialogModule } from "./dialog.module";
import { Component, Inject } from "@angular/core";
import { DialogConfig, DialogRef, DialogService } from "@lens/app-abstract-ui";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogComponent } from "@lens/app-abstract-ui";
import { ButtonModule } from "../button";
import { DialogComponent } from "@lens/app-abstract-ui";
import { ButtonModule } from "../button";

@Component({
	template: `
		<ng-template #body>Dialog works!</ng-template>
		<ng-template #footer>
			<button (click)="onSomeCustomActionButtonClicked()">Some custom action</button>
			<button (click)="onCloseButtonClicked()">Close</button>
		</ng-template>
	`
})
class CustomDialogComponent extends DialogComponent {
	constructor(@Inject("LensDialogRef") private readonly ref: DialogRef, @Inject("LensDialogConfig") public readonly config: DialogConfig) {
		super();
	}

	public onSomeCustomActionButtonClicked() {
		this.ref.close({ foo: "bar" });
	}

	public onCloseButtonClicked() {
		this.ref.close();
	}
}
class CustomDialogComponent extends DialogComponent {
	constructor(@Inject("LensDialogRef") private readonly ref: DialogRef, @Inject("LensDialogConfig") public readonly config: DialogConfig) {
		super();
	}

	public onSomeCustomActionButtonClicked() {
		this.ref.close({ foo: "bar" });
	}

	public onCloseButtonClicked() {
		this.ref.close();
	}
}

@Component({
	template: `
		<lens-button
			(clicked)="foo()"
			label="Show dialog"></lens-button>
	`
})
class DialogHostComponent {
	constructor(private readonly dialogService: DialogService) {}
class DialogHostComponent {
	constructor(private readonly dialogService: DialogService) {}

	public foo(): void {
		const dialogRef = this.dialogService.open(CustomDialogComponent, { header: "In a galaxy far, far away..." });
		dialogRef.onClose.subscribe((result) => alert(`Received from the dialog:\n\n${JSON.stringify(result)}`));
	}
	public foo(): void {
		const dialogRef = this.dialogService.open(CustomDialogComponent, { header: "In a galaxy far, far away..." });
		dialogRef.onClose.subscribe((result) => alert(`Received from the dialog:\n\n${JSON.stringify(result)}`));
	}
}

export default {
	component: DialogHostComponent,
	title: "Services/Dialog",
	decorators: [
		moduleMetadata({
			imports: [DialogModule, ButtonModule, BrowserAnimationsModule]
		})
	]
} as Meta;

export const Default: Story = (args) => ({
	component: DialogHostComponent,
	props: {
		...args
	}
});
