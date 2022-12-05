import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { DialogModule } from "./dialog.module";
import { Component } from "@angular/core";
import { DialogService } from "@lens/app-abstract-ui";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
    template: `Dialog works!`
})
class CustomDialogComponent { }

@Component({
    template: `<button (click)="foo()">Show dialog</button>`
})
class DialogHostComponent {
    constructor (
        private readonly dialogService: DialogService
    ) { }

    public foo(): void {
        this.dialogService.open(CustomDialogComponent, { header: "In a galaxy far, far away..." })
    }
}

export default {
    component: DialogHostComponent,
    title: "Components/Dialog",
    decorators: [
        moduleMetadata({
            imports: [ DialogModule , BrowserAnimationsModule]
        })
    ]
} as Meta

export const Default: Story = args => ({
    component: DialogHostComponent,
    props: {
        ...args
    }
});