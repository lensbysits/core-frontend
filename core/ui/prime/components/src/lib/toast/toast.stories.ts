import { Component } from "@angular/core";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { ToastModule } from "../toast";
import { ButtonModule } from "../button";
import { ToastService } from "./toast.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
    template: `<lens-toast></lens-toast><button (click)="foo()">Show toaster</button>`
})
class ToastComponentHost {
    constructor (
        private readonly toastService: ToastService
    ) { }

    public foo() {
        this.toastService.success("foo", "bar");
    }
}

export default {
    component: ToastComponentHost,
    title: "Components/Toast",
    decorators: [
        moduleMetadata({
            declarations: [
                ToastComponentHost
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
    component: ToastComponentHost,
    props: {
        ...args,
        foo: () => null
    }
});
