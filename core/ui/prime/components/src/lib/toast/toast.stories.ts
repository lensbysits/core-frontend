import { Component } from "@angular/core";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { ToastModule } from "../toast";
import { ButtonModule } from "../button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastService } from "@lens/app-abstract";

@Component({
    template: `<lens-toast></lens-toast><button (click)="foo()">Show toaster</button>`
})
class ToastHostComponent {
    constructor (
        private readonly toastService: ToastService
    ) { }

    public foo() {
        this.toastService.success("foo", "bar");
    }
}

export default {
    component: ToastHostComponent,
    title: "Components/Toast",
    decorators: [
        moduleMetadata({
            declarations: [
                ToastHostComponent
            ],
            imports: [
                ToastModule,
                ButtonModule,
                BrowserAnimationsModule
            ]
        })
    ]
} as Meta

export const Default: Story = args => ({
    component: ToastHostComponent,
    props: {
        ...args,
        foo: () => null
    }
});
