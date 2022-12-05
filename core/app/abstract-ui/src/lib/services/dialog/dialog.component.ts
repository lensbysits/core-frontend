import { Component, TemplateRef, ViewChild } from "@angular/core";

@Component({
    template: ''
})
export abstract class DialogComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @ViewChild("body", { read: TemplateRef }) public bodyTemplate!: TemplateRef<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @ViewChild("footer", { read: TemplateRef }) public footerTemplate!: TemplateRef<any>;
}